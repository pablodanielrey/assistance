import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Justificacion } from '../entities/asistencia';
import { AssistanceService } from '../assistance.service';


@Component({
  selector: 'app-justificacion-personal',
  templateUrl: './justificacion-personal.component.html',
  styleUrls: ['./justificacion-personal.component.css']
})
export class JustificacionPersonalComponent implements OnInit {

  info: any;
  fecha: Date;
  fechaInicio: Date;
  fechaFin: Date;
  usuario_id: string;
  justificaciones: Justificacion[];
  subscriptions: any[] = [];
  seleccionFecha: string = 'simple';
  justificacion: Justificacion = null;


  constructor(private route: ActivatedRoute,
              private service: AssistanceService) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    this.usuario_id = params.get('uid');

    let fecha_str = paramsQ.get('fecha');
    this.fecha = (fecha_str == null)? new Date() : new Date(fecha_str);
    this.fechaInicio = new Date(this.fecha);
    this.fechaFin= new Date(this.fecha);

    this.buscarJustificaciones();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  buscarJustificaciones() {
    this.justificaciones = [];
    this.subscriptions.push(this.service.buscarJustificaciones()
      .subscribe(justificaciones => {
        this.justificaciones = justificaciones;
      }));
  }

  seleccionarJustificacion(j:Justificacion) {
    this.justificacion = j;
  }
}
