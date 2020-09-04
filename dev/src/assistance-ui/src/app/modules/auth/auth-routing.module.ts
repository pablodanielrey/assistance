import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthErrorComponent } from './auth-error/auth-error.component';


const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path:'oauth2', component: AuthComponent },
      { path:'oauth2_error', component: AuthErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
