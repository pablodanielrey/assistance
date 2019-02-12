import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OAuthModule, OAuthStorage, OAuthResourceServerErrorHandler } from 'angular-oauth2-oidc';


@Injectable({
  providedIn: 'root'
})
export class OauthErrorHandler implements OAuthResourceServerErrorHandler {

  constructor() { }

  handleError(err: HttpResponse<any>): Observable<any> {
    console.log(err);
    return of(() => {throw err});
  }

}
