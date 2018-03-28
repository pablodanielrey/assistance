import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Lugar } from '../entities/asistencia';


import { MatSelectionList, MatSelectionListChange, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-listado-lugares',
  templateUrl: './listado-lugares.component.html',
  styleUrls: ['./listado-lugares.component.css']
})
export class ListadoLugaresComponent implements OnInit {

  @Input()
  lugares: Lugar[];

  @Output()
  selected: EventEmitter<Lugar[]> = new EventEmitter<Lugar[]>();

  @ViewChild(MatSelectionList) listaLugares: MatSelectionList;

  busqueda: string = "";

  constructor() { }

  ngOnInit() {
    console.log(this.lugares);
    this.busqueda = "";
  }

  seleccionarLugar(l:Lugar) {
    let seleccionados = this.listaLugares.selectedOptions.selected.map(item => item.value);
    this.selected.emit(seleccionados);
  }

}
