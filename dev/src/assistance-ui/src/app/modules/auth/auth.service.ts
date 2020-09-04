import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig, JwksValidationHandler, NullValidationHandler } from 'angular-oauth2-oidc';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauth: OAuthService, 
              private oauthConfig: AuthConfig) { 

    console.log(oauthConfig);
    this.oauth.configure(oauthConfig);

    this.oauth.tokenValidationHandler = new NullValidationHandler();
    // este validador falla porque falta el parámetro jwks
    //this.oauth.tokenValidationHandler = new JwksValidationHandler();

    this.oauth.loadDiscoveryDocument();
  }

  read_tokens_from_url():Observable<boolean> {
    return from(this.oauth.tryLogin()).pipe(
      catchError(err => of(false))
    );
  }

  login(): Observable<void> {
    return of(this.oauth.initLoginFlow());
  }

  is_authenticated():Observable<boolean> {
    return of(this.oauth.hasValidAccessToken()).pipe(
      switchMap(b => b ? of(b) : from(this.oauth.tryLogin()))
    )
  }

  logout() {
    this.oauth.logOut(true);
  }

  claims(): Observable<any> {
    let o = this.oauth.getIdentityClaims(); 
    console.log(o);
    return of(o);
  }




}
