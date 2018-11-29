import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { NotificacionesService } from '../../notificaciones.service';
import { AssistanceService } from '../../assistance.service';

import { DatosHorario, Horario } from '../../entities/asistencia';


import { ActivatedRoute } from '@angular/router';

class HorarioMinutos {
  horario: Horario;
  horas: number;
  minutos: number;

  constructor(h: Horario) {
    this.horario = h;
    let minutos = h.cantidadHoras / 60;
    this.horas = Math.trunc(minutos / 60);
    this.minutos = Math.trunc(minutos % 60);
  }

  obtenerHoraSalida() {
    return  this.horario.hora_entrada + (this.horas * 3600) + (this.minutos * 60);
  }
 
}

@Component({
  selector: 'app-horario-modificar',
  templateUrl: './horario-modificar.component.html',
  styleUrls: ['./horario-modificar.component.css']
})
export class HorarioModificarComponent implements OnInit {
  usuario_id: string = null;
  fecha: Date = new Date();
  subscriptions: any[] = [];
  info: DatosHorario = null;
  cargando: boolean = false;
  horarios: Array<HorarioMinutos> = [];

  constructor(private service: AssistanceService,
              private location: Location,
              private notificaciones: NotificacionesService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    this.usuario_id = params.get('uid');
    this.fecha = new Date(paramsQ.get('fecha'));

    this.obtenerHorario();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  cambio(event: any, h: Horario) {
    if (event.target.valueAsDate == null) {
        h.hora_entrada = 0;
        h.setEntrada(0);
        h.cantidadHoras = 0;
        return
    }
    let millis = event.target.valueAsNumber;
    let sec = millis / 1000;
    h.hora_entrada = sec;
    h.setEntrada(sec);
  }

  obtenerHorasSemanales() {
    let segundos = 0;
    if (this.horarios == null) {
      return 0
    }
    let minutosTotales = 0;
    for (let i = 0; i < this.horarios.length; i++) {
      let h = this.horarios[i];
      minutosTotales += (h.horas * 60) + h.minutos;
    }
    let hs = minutosTotales / 60;
    let ms = minutosTotales % 60;
    return Math.trunc(hs) + ':' + ('0' + ms).slice(-2);
  }

  obtenerHorario() {
    this.cargando = true;
    this.subscriptions.push(this.service.obtenerHorario(this.usuario_id, this.fecha)
    .subscribe(r => {
      this.info = r;
      this.info.horarios.sort((h1, h2):number => {
        if (h1.dia_semanal == null) return -1;
        if (h2.dia_semanal == null) return 1;
        return h1.dia_semanal - h2.dia_semanal
      });
      this.horarios = [];
      this.info.horarios.forEach(h => this.horarios.push(new HorarioMinutos(h)))
      console.log(this.horarios);
      this.cargando = false;
    }));
  }

  guardar() {
    let horarios_guardar = [];
    for (let i=0; i < this.horarios.length; i++) {
      let h = this.horarios[i];
      h.horario.fecha_valido = this.fecha;
      h.horario.hora_salida = h.obtenerHoraSalida();
      h.horario.usuario_id = this.usuario_id;
      horarios_guardar.push(h.horario);
    }
    this.subscriptions.push(this.service.crearHorario(horarios_guardar)
    .subscribe(r => {
      this.notificaciones.show("El horario se ha creado correctamente");
      this.volver();
    }));
  }

}
