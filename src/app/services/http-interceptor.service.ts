import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService,private authService: AuthService,private utilService:UtilService) {}

  removeRequest(request: HttpRequest<any>) {

  const i = this.requests.indexOf(request);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length === 0) {
      this.loaderService.hide();
    }
  }
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (request.method!="GET" && !this.authService.isLoggedIn()) {
      this.utilService.logOutUnAuthorizedUser();
    } else {
      if (request.method == 'POST' || request.method == 'PATCH') {
        request = request.clone({
          setHeaders: {
            'X-API-KEY': environment.X_API_KEY,
            'Content-Type': 'application/json',
          },
        });
      }

      this.requests.push(request);

      this.loaderService.show();
    }
    return next.handle(request).pipe(finalize(() => this.removeRequest(request)));
  }
}
