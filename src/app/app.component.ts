import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pokemon_trainer';

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private loader: LoaderService,
    private dct: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loader.getLoader.subscribe((loading) => {
      if (loading) {
        this.ngxLoader.start();
      } else {
        this.ngxLoader.stop();
      }

      this.dct.detectChanges();
    });
  }
}
