import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OAuthModule, OAuthStorage, OAuthResourceServerErrorHandler } from 'angular-oauth2-oidc';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class OauthErrorHandler implements OAuthResourceServerErrorHandler {

  constructor(private service: OAuthService, private router:Router) {
  }

  handleError(err: HttpResponse<any>): Observable<any> {
    console.log(err);
    if (err.status == 401 || err.status == 400) {
      // token inválido o requerimiento sin token
      this.service.logOut(true);
      //this.service.invalidateSession().subscribe(() => {console.log('sesión deslogueada')});
      this.router.navigate(['/']).then(() => { console.log('navegado exitoso')});
      return of(() => {console.log('nada - para ver si se ejecuta alguna vez')});
    } else {
      return of(() => {throw err});
    }
  }

}
