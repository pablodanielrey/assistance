import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';
import { OAuthService } from 'angular-oauth2-oidc';

import { AssistanceService } from '../assistance.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input('menu_abierto') menu_abierto: boolean;
  //@Output() openedChange = new EventEmitter<boolean>();
  @Output() onItem = new EventEmitter<boolean>();

  modulos: string[] = [];
  subscriptions: any[] = [];

  constructor(private oauthService: OAuthService, private router: Router, private service: AssistanceService) { }

  ngOnInit() {
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
      console.log(this.modulos);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  onInternalItem():void {
    this.onItem.emit(false);
  }

  inicial():void {
    this.onInternalItem();
    this.router.navigate(['/sistema', {outlets: {'pantalla': ['inicial']}}]);
  }

  onOpenedChange(event: boolean):void {
    this.onItem.emit(event);
  }

  chequearPerfil(profiles: string[]): boolean {
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        return true;
      }
    });
    return false;
  }

}
