import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';
import { OAuthService } from 'angular-oauth2-oidc';
import { Usuario } from '../entities/usuario';

import { AssistanceService } from '../assistance.service';
import { environment } from '../../environments/environment';

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
  usuarioId: string;

  constructor(private oauthService: OAuthService, private router: Router, private service: AssistanceService, private location: Location) { }

  ngOnInit() {
    let info: any = this.oauthService.getIdentityClaims();
    this.usuarioId = info.sub;
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

  obtener_fecha_final(fecha: Date) {
    return fecha.toISOString();
  }

  obtener_fecha_inicial(fecha: Date) {
    let data = (new Date(fecha.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString());
    return data;
  }

  ver_reporte_personal(): void {
    let path = this.location.path().split(';');

    this.router.navigate(['/sistema/reportes/personal/' + this.usuarioId,
      {
        fecha_inicial:this.obtener_fecha_inicial(new Date()),
        fecha_final:this.obtener_fecha_final(new Date()),
        back: path[0]
      }
    ]);
  }

  onOpenedChange(event: boolean):void {
    this.onItem.emit(event);
  }

  chequearPerfil(profiles: string[]): boolean {
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        r = true;
      }
    });
    return r
  }

  telegram() {
    this.onInternalItem();
    this.subscriptions.push(this.service.obtenerTelegramToken().subscribe(t => {
      window.open(environment.telegramURL + t.token, "_blank");
    },
    e => {
      console.log(e);
    }));
  }

}
