import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Justificacion, FechaJustificada } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-justificacion-general',
  templateUrl: './justificacion-general.component.html',
  styleUrls: ['./justificacion-general.component.css']
})
export class JustificacionGeneralComponent implements OnInit {
  info: any;
  fecha: Date;
  fechaInicio: Date;
  fechaFin: Date;
  justificaciones: Justificacion[];
  justificacion: Justificacion = null;

  subscriptions: any[] = [];
  seleccionFecha: string = 'simple';

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: AssistanceService) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    let fecha_str = paramsQ.get('fecha');
    this.fecha = (fecha_str == null)? new Date() : new Date(fecha_str);
    this.fechaInicio = new Date(this.fecha);
    this.fechaFin = new Date(this.fecha);

    this.buscarJustificaciones();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  buscarJustificaciones() {
    this.justificaciones = [];
    this.subscriptions.push(this.service.buscarJustificaciones()
      .map(justificaciones => justificaciones.filter(j => j.general ? j.general : false))
      .subscribe(justificaciones => {
        this.justificaciones = justificaciones;
      }));
  }

  seleccionarJustificacion(j:Justificacion) {
    this.justificacion = j;
  }

  setInit(fecha:Date): Date {
    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);
    return fecha;
  }

  volver() {
    this.location.back();
  }

  justificar() {
    let fj=  new FechaJustificada({});
    fj.justificacion = this.justificacion;
    if (this.seleccionFecha == 'simple') {
      this.fecha = this.setInit(this.fecha);
      fj.fechaInicio = this.fecha;
      fj.fechaFin = null;
    } else {
      fj.fechaInicio = this.setInit(this.fechaInicio);
      fj.fechaFin = this.setInit(this.fechaFin);
    }

    this.subscriptions.push(this.service.justificar(fj)
      .subscribe(r => {
        console.log(r);
      }));

  }
}
