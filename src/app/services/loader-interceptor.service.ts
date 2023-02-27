import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptorService {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {}

  removeRequest(req: HttpRequest<any>) {

    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length === 0) {
      this.loaderService.hide();
    }
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.endsWith('/gateway/auth') ||
      req.url.endsWith('applicationLog')
    ) {
      return next.handle(req);
    }
    this.requests.push(req);

    this.loaderService.show();
    return next.handle(req).pipe(finalize(() => this.removeRequest(req)));
  }
}
