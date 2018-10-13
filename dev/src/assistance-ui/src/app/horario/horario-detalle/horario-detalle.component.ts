import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AssistanceService } from '../../assistance.service';

import { DatosHorario } from '../../entities/asistencia';


import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-horario-detalle',
  templateUrl: './horario-detalle.component.html',
  styleUrls: ['./horario-detalle.component.css']
})
export class HorarioDetalleComponent implements OnInit {

  usuario_id: string = null;
  fecha: Date = new Date();
  fecha_inicio: Date = null;
  fecha_fin: Date = null;
  subscriptions: any[] = [];
  info: DatosHorario = null;
  cargando: boolean = false
  modulos: string[] = [];

  constructor(private service: AssistanceService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.usuario_id = params.get('uid');
    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
      this.obtenerHorario();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  _sumarDias(fecha, dias): Date {
    let f = new Date(fecha.getTime());
    f.setDate(f.getDate() + dias);
    return f;
  }

  _setearFechaInicio(fecha: Date) {
    let nro = (fecha.getDay() == 0) ? 6 : fecha.getDay() - 1;
    this.fecha_inicio = this._sumarDias(this.fecha, -nro);
  }

  _setearFechaFin(fecha: Date) {
    let nro = (fecha.getDay() == 0) ? 0 : 7-fecha.getDay();
    this.fecha_fin = this._sumarDias(this.fecha, nro);
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

  obtenerHorario() {
    this._setearFechaInicio(this.fecha);
    this._setearFechaFin(this.fecha);
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerHorario(this.usuario_id, this.fecha_inicio)
    .subscribe(r => {
      this.info = r;
      this.info.horarios.sort((h1, h2):number => {
        if (h1.dia_semanal == null) return -1;
        if (h2.dia_semanal == null) return 1;
        return h1.dia_semanal - h2.dia_semanal
      });
      this.cargando = false;
    }));

  }



}
