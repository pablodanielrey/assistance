import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Usuario } from '../entities/usuario';
import { DatosAsistencia } from '../entities/asistencia';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Output()
  selected: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @Output('searchEvent')
  search: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  usuarios: Array<DatosAsistencia> = new Array<DatosAsistencia>();

  busqueda: string = "";

  constructor() { }

  ngOnInit() {
  }

  seleccionarUsuario(u: Usuario):void {
    this.selected.emit(u);
  }

  buscarUsuarios(): void {
    this.search.emit(this.busqueda);
  }

}
