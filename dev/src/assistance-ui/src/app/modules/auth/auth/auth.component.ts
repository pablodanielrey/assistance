import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  message: any = null;

  constructor(private auth: AuthService, 
              private route: ActivatedRoute,
              private router: Router) { 
  }

  ngOnInit() {

    let is_auth$ = this.auth.is_authenticated()
    let read_tokens$ = this.auth.read_tokens_from_url()

    this.subs.push(
      is_auth$.pipe(
        switchMap(b => b ? of(b) : read_tokens$)
      ).subscribe(b => {
        let url = localStorage.getItem('oauth_redirect_url');
        if (url != null) {
          // voy a la url pedida originalmente antes de la autentificacion
          console.log(`redireccionando a la url requerida anteriormente ${url}`);
          this.router.navigateByUrl(url);
        } else {
          this.router.navigate(['/']);
        }
      })
    )

  }

  salir() {
    this.auth.logout();
  }

}
