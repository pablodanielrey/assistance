import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss']
})
export class AuthErrorComponent implements OnInit {


  /*
    error=invalid_request
    error_description=The+request+is+missing+a+required+parameter%2C+includes+an+invalid+parameter+value%2C+includes+a+parameter+more+than+once%2C+or+is+otherwise+malformed
    error_hint=The+"redirect_uri"+parameter+does+not+match+any+of+the+OAuth+2.0+Client%27s+pre-registered+redirect+urls.
  */

  error$: Observable<any> = null;

  constructor(private route:ActivatedRoute) { 
    console.log('oauth2error');
    this.error$ = this.route.queryParamMap.pipe(
      tap(v => console.log(v)),
      map(p => {
        let e = {
          'error': p.get('error') != null ? p.get('error') : '',
          'description': p.get('error_description') != null ? p.get('error_description') : '',
          'hint': p.get('error_hint') != null ? p.get('error_hint') : ''
        }
        return e;
      }),
      tap(v => console.log(v))
    );
  }

  ngOnInit() {
  }

}
