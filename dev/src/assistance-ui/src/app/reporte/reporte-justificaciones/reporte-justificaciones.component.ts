import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

import { Reporte, RenglonReporte, Marcacion, FechaJustificada, ReporteJustificaciones } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

import { MatDialog, MatDialogRef } from '@angular/material';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-reporte-justificaciones',
  templateUrl: './reporte-justificaciones.component.html',
  styleUrls: ['./reporte-justificaciones.component.css']
})
export class ReporteJustificacionesComponent implements OnInit {
  buscando: boolean = false;
  back: string;
  modulos: string[] = [];
  usuario_id: string = null;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  reporte: ReporteJustificaciones = null;
  subscriptions: any[] = []; 
  height;
  width;
  

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }
  constructor(
              private oauthService: OAuthService,
              private service: AssistanceService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private location: Location) {
              
                this.onResize();
    }

  ngOnInit() {
    this.buscando = false;
    this.route.params.subscribe(params => {
      console.log('parametros cambiaron');
      console.log(params);
      this.usuario_id = params['uid'];
      this.back = (params['back']) ? params['back'] : '/sistema/reportes/justificaciones';
      if (params['fecha_inicial'] && params['fecha_final']) {
        this.fecha_inicial = new Date(params['fecha_inicial']);
        this.fecha_final = new Date(params['fecha_final']);
      } else {
         this.fecha_final = new Date(Date.now());
         this.fecha_inicial = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) );
      }
    });
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
      console.log(this.modulos);
    }));
    this._generarReporte();
    console.log(this.reporte);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.router.navigate([this.back, {fecha: this.fecha_final}]);
  }

  _generarReporte(): void {
    this.reporte = null;
    this.buscando = true;
    this.subscriptions.push(this.service.generarReporteJustificaciones(this.usuario_id, this.fecha_inicial, this.fecha_final)
    .subscribe(r => {
      this.buscando = false;
      this.reporte = r;
    }));
  }

  generarReporte():void {
    this.router.navigate(['/sistema/reportes/justificaciones', this.usuario_id, {fecha_inicial:this.fecha_inicial.toISOString(), fecha_final:this.fecha_final.toISOString(), back: this.back}]);
  }

}
