import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { AuthenticationGuard } from './services/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'trainer',
    component: TrainerComponent,canActivate:[AuthenticationGuard]
  }, {
    path: 'catalogue', component: CatalogueComponent,canActivate:[AuthenticationGuard]
  },
   { path: '**', redirectTo:'/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {




}



