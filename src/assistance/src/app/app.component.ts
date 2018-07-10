import { Component } from '@angular/core';
import { Router } from '@angular/router';

// configuro la autentificacion
import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://oidp.econo.unlp.edu.ar',
  redirectUri: window.location.origin,
  // tokenEndpoint: 'https://oidp.econo.unlp.edu.ar/oauth2/auth',
  userinfoEndpoint: 'https://oidp.econo.unlp.edu.ar/userinfo',
  loginUrl: 'https://oidp.econo.unlp.edu.ar/oauth2/auth',
  logoutUrl: 'https://consent.econo.unlp.edu.ar/logout',
  oidc: true,
  requireHttps: false,
  clientId: 'assistance-ui',
  dummyClientSecret: 'assistance-ui',
  scope: 'openid profile email',
  showDebugInformation: true
}
import { OAuthService } from 'angular-oauth2-oidc';
import { NullValidationHandler, JwksValidationHandler } from 'angular-oauth2-oidc';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  menu_abierto: boolean = false;

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configureWithNewConfigApi();
  }

  onMenu(abierto: boolean):void {
    this.menu_abierto = !this.menu_abierto;
  }

  onOpenedChange(abierto: boolean): void {
    this.menu_abierto = abierto;
  }

  onItem(v:boolean):void {
    this.menu_abierto = v;
  }

  private configureWithNewConfigApi() {
    console.log('configurando oauth2');
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.events.subscribe(e => {
        console.debug('oauth/oidc event', e);
    })
    console.log('tratando de loguearme');
    this.oauthService.tryLogin();
    if (this.oauthService.getAccessToken() == null) {
    //    console.log('No se obtuvo ningun access token asi que inicio el flujo de auth');
    //    //this.oauthService.initImplicitFlow();
      this.router.navigate(['/loader']);
    } else {
      // this.router.navigate(['/sistema/inicial']);
    }
  }

}
