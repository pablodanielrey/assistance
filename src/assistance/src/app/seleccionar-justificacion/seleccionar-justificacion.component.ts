import { Component, OnInit, Input } from '@angular/core';

import { Justificacion } from '../entities/asistencia';

@Component({
  selector: 'app-seleccionar-justificacion',
  templateUrl: './seleccionar-justificacion.component.html',
  styleUrls: ['./seleccionar-justificacion.component.css']
})
export class SeleccionarJustificacionComponent implements OnInit {

  @Input() justificaciones: Justificacion[];
  busqueda: string = "";

  constructor() { }

  ngOnInit() {
    this.busqueda = "";
  }

}
