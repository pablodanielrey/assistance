import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

import { ActivatedRoute, Router } from '@angular/router';
import { ReporteGeneral, RenglonReporte, Marcacion, FechaJustificada, Configuracion } from '../../entities/asistencia';
import { Location } from '@angular/common';

import { AssistanceService } from '../../assistance.service';

import { MatDialog, MatDialogRef } from '@angular/material';

import { DialogoEliminarFechaJustificadaComponent } from '../dialogo-eliminar-fecha-justificada/dialogo-eliminar-fecha-justificada.component';


@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  height;
  width;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  subscriptions: any[] = [];
  fecha: Date;
  ids: string[];
  reportes: Array<ReporteGeneral> = [];
  eliminarJustificacionDialogRef: MatDialogRef<DialogoEliminarFechaJustificadaComponent>;
  buscando: boolean = false;
  modulos: string[] = [];
  config: Configuracion = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: AssistanceService,
              public dialog: MatDialog,
              private location: Location) { 
                this.onResize();
              }

  ngOnInit() {
    this.buscando = false;

    this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
      this.config = r;
    }));

    this.route.params.subscribe(params => {
      this.ids = params['ids'].split(",");
      this.fecha = new Date(params['fecha']) || new Date(Date.now());
      this._generarReporte();
    });
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
      console.log(this.modulos);
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.router.navigate(['/sistema/reportes/general/seleccion']);
  }

  _generarReporte():void {
    this.reportes = [];
    this.buscando = true;
    this.subscriptions.push(this.service.generarReporteGeneral(this.ids, this.fecha)
    .subscribe(r => {
      this.reportes = r;
      this.buscando = false;
    }));
  }

  generarReporte():void {
    this.router.navigate(['/sistema/reportes/general/generar/', this.fecha.toISOString(), {ids: this.ids}]);
  }

  obtenerHoraEntrada(r: RenglonReporte) {
    if (r.horario) {
      let e = new Date(r.fecha); e.setSeconds(0); e.setMinutes(0); e.setHours(0);
      e.setSeconds(r.horario.hora_entrada)
      return e;
    }
  }

  obtenerHoraSalida(r: RenglonReporte) {
    if (r.horario) {
      let s = new Date(r.fecha); s.setSeconds(0); s.setMinutes(0); s.setHours(0);
      s.setSeconds(r.horario.hora_salida)
      return s;
    }
  }

  obtenerMarcacion(m: Marcacion): Date {
    if (m == null) {
      return null
    }
    return m.marcacion
  }

  obtenerIcono(m: Marcacion): String {
    if (!this.config.mostrar_tipo_marcacion) {
      return null;
    }
    if (m == null) {
      return null
    }
    if (m.tipo == 0) {
      return 'dialpad';
    }
    if (m.tipo == 1) {
      return 'fingerprint';
    }
    if (m.tipo == 3) {
      return 'laptop';
    }
  }

  obtenerHorasTrabajadas(r:RenglonReporte) {
    let segundos = r.cantidad_horas_trabajadas;
    let min = Math.trunc((segundos / 60) % 60);
    let hs = Math.trunc((segundos / 60) / 60);
    let a = '';
    let b = '';
    if (min < 10) {
      b = '0';
    }
    if (hs < 10) {
      a = '0';
    }
    return a + String(hs) + ":" + b + String(min);

  }

  obtenerMarcacionesIndividuales(r: RenglonReporte): string {
    let marcaciones = ''
    r.marcaciones.forEach(m => marcaciones = marcaciones + '<br>' + new Date(m.marcacion));
    return marcaciones;
  }
  
  eliminarJustificacion(justificacion:any, uid: any) {
    this.eliminarJustificacionDialogRef = this.dialog.open(DialogoEliminarFechaJustificadaComponent, {data: justificacion});
    this.eliminarJustificacionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.service.eliminarFechaJustificada(uid, justificacion.id)
        .subscribe(r => {
          this.clearJustificaciones(r);
        }));
      }
    });
  }

  clearJustificaciones(jid: string) {
    this.reportes.forEach(rep => rep.reportes.forEach(r => r.justificaciones = this.eliminarJustificacionDeRenglon(r.justificaciones, jid)));
  }

  eliminarJustificacionDeRenglon(justificaciones: FechaJustificada[], jid): Array<any> {
    return justificaciones.filter(j => j.id != jid);;
  }

  is_desktop() {
    return this.width >= 769;
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

}
