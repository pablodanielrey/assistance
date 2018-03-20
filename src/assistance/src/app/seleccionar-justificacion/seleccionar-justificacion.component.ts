import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Justificacion } from '../entities/asistencia';

@Component({
  selector: 'app-seleccionar-justificacion',
  templateUrl: './seleccionar-justificacion.component.html',
  styleUrls: ['./seleccionar-justificacion.component.css']
})
export class SeleccionarJustificacionComponent implements OnInit {

  @Input()
  justificaciones: Justificacion[];

  @Output()
  selected: EventEmitter<Justificacion> = new EventEmitter<Justificacion>();

  busqueda: string = "";

  constructor() { }

  ngOnInit() {
    this.busqueda = "";
  }

  seleccionarJustificacion(j: Justificacion):void {
    this.selected.emit(j);
  }

}
