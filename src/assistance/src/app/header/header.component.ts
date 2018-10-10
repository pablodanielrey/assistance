import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { ToogleFullscreenDirective } from '../toogle-fullscreen.directive';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menu = new EventEmitter<boolean>();
  info: any;

  constructor(private oauthService: Oauth2Service) { }

  ngOnInit() {
    /*
    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });
    */
  }

  cambiar_menu():void {
    this.menu.emit(true);
  }


  salir():void {
    this.oauthService.logout();
  }

}
