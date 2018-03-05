import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

import { Reporte, RenglonReporte, Marcacion } from '../entities/asistencia';
import { AssistanceService } from '../assistance.service';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(private oauthService: OAuthService,
              private service: AssistanceService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location) { }


  info: any = null;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  usuario_id: string = null;
  subscriptions: any[] = [];

  reporte: Reporte = null;

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    this.fecha_inicial = new Date(paramsQ.get('fecha_inicial'));
    this.fecha_final = new Date(paramsQ.get('fecha_final'));

    // this.fecha_inicial = new Date(params.get('fecha_ini'));
    // this.fecha_final = new Date(params.get('fecha_fin'));
    this.usuario_id = params.get('uid');

    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });
  }

  salir():void {
    this.oauthService.logOut(true);
    window.location.href = this.oauthService.logoutUrl;
    //window.location.reload();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  generarReporte():void {
    console.log(this.fecha_inicial);
    this.subscriptions.push(this.service.generarReporte(this.usuario_id, this.fecha_inicial, this.fecha_final)
    .subscribe(r => {
      console.log(r);
      this.reporte = r;
    }));
  }

  obtenerHorario(r: RenglonReporte): string {
    if (r.horario) {
      let e = new Date(r.fecha.getTime()); e.setSeconds(0); e.setMinutes(0); e.setHours(0);
      let s = new Date(e.getTime());
      e.setSeconds(r.horario.hora_entrada);
      s.setSeconds(r.horario.hora_salida);
      return e.toLocaleTimeString() + "-" + s.toLocaleTimeString();
    }
  }

  obtenerMarcacion(m: Marcacion): Date {
    if (m == null) {
      return null
    }
    return m.marcacion
  }

  obtenerUsuario():string {
    if (this.reporte && this.reporte.usuario) {
      return this.reporte.usuario.dni;
    }
  }

  obtenerReportes() {
    if (this.reporte ==  null) {
      return []
    }
    return this.reporte.reportes;
  }

}
