import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  info: any;
  
  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });

  }

  cambiar():void {
    //this.menu.abierto = !this.menu.abierto;
  }

}
