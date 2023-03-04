import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FormsModule } from '@angular/forms';
import { GenerateImagesUrlPipe } from './pipes/generate-images-url.pipe';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSpinner } from '@angular/material';
import { LoaderInterceptorService } from './services/http-interceptor.service';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { CheckIfPokemonExistsInTrainerCollectionPipe } from './pipes/check-if-pokemon-exists-in-trainer-collection.pipe';
import { HeaderComponent } from './components/header/header.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsOpacity: 0.3,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: false,
  fgsColor: 'red',
  fgsPosition: 'center-center',
  fgsSize: 80,
  fgsType: 'three-strings',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 80,
  logoUrl: './assets/images/pokeball.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(246,241,241,0.8)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: 'Loading.....',
  textColor: '#000000',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrainerComponent,
    CatalogueComponent,
    GenerateImagesUrlPipe,
    CheckIfPokemonExistsInTrainerCollectionPipe,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
        tapToDismiss: false,
        closeButton: true,
        timeOut: 5000,
        positionClass: 'toast-top-center',
      }),
  ],
  exports: [MatCardModule, MatButtonModule, MatIconModule, MatInputModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
