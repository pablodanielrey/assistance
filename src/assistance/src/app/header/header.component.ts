import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menu = new EventEmitter<boolean>();
  info: any;

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });

  }

  cambiar_menu():void {
    this.menu.emit(true);
  }


  salir():void {
    this.oauthService.logOut(true);
    window.location.href = this.oauthService.logoutUrl;
    //window.location.reload();
  }

}
