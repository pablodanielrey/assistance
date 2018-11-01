import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { ToogleFullscreenDirective } from '../toogle-fullscreen.directive';
import { UpdateService } from '../update.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  usersLink: string = environment.usersLink;

  @Output() menu = new EventEmitter<boolean>();
  info: any;

  constructor(@Inject('window') private window: any, 
              private router: Router, 
              private oauthService: Oauth2Service,
              private update: UpdateService) { 
              }

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
    this.oauthService.logout().subscribe(
      r => {
        console.log(r);
        this.router.navigate(['/']);
      },
      e => {
        console.log(e);
        this.router.navigate(['/']);
      }
    );
  }

  actualizar() {
    this.update.checkForUpdate();
  }

  mi_perfil() {
    this.window.open(this.usersLink,'_new');
  }

  cambiar_clave() {
    this.window.open(this.usersLink,'_new');
  }

}
