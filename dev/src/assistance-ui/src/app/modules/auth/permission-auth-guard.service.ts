import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';

/*
  https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
*/


@Injectable({
  providedIn: 'root'
})
export class PermissionAuthGuardService implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.is_authenticated().pipe(
      switchMap(b => {
        if (!b) {
          let url = state.url;
          localStorage.setItem('oauth_redirect_url', url);
          console.log(`seteando url de redirección ${url}`);
          return this.auth.login().pipe(map(_ => b));
        }
        return of(b);
      })
    );  
  }

}
