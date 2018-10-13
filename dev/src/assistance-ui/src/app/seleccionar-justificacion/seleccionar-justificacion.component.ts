import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Justificacion } from '../entities/asistencia';

import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
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

  @ViewChild(MatSelectionList) listaJustificaciones: MatSelectionList;

  constructor() { }

  ngOnInit() {
    this.busqueda = "";
    this.listaJustificaciones.selectionChange.subscribe((s: MatSelectionListChange) => {

          this.listaJustificaciones.deselectAll();
          s.option.selected = true;
      });
  }

  seleccionarJustificacion(j: Justificacion):void {
    this.selected.emit(j);
  }

}
