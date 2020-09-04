import { NgModule, SkipSelf, Optional, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OAuthModule, AuthConfig, OAuthModuleConfig, OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';

import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthErrorComponent } from './auth-error/auth-error.component';

export type OAuth2Config = AuthConfig;


@NgModule({
  declarations: [
    AuthComponent,
    AuthErrorComponent
  ],
  imports: [
    CommonModule,
    OAuthModule,
    AuthRoutingModule
  ],
  exports: [
    AuthRoutingModule
  ]
})
export class AuthModule { 

  constructor(@Optional() @SkipSelf() auth: AuthModule) {
    if (auth) {
      throw new Error('Solo debe importarse dentro de AppModule');
    }
  }

  static forRoot(config: OAuth2Config): ModuleWithProviders  {
    return {
      ngModule: AuthModule,
      providers: [ 
        AuthService,
        OAuthService,
        UrlHelperService,
        { provide: AuthConfig, useValue: config },
        { provide: OAuthLogger, useValue: console }
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    }
  }

}
