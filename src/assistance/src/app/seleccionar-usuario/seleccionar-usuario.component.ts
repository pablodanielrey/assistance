import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Usuario } from '../entities/usuario';
import { AssistanceService } from '../assistance.service';


@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.css']
})
export class SeleccionarUsuarioComponent implements OnInit {

  usuarios: any[] = [];
  busqueda:string;
  busquedaActivada: boolean = false;
  subscriptions: any[] = [];
  @Output() seleccionado: EventEmitter<Usuario> = new EventEmitter();

  constructor(public service: AssistanceService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  actualizarBusqueda() : void {
    this.busquedaActivada = (this.busqueda.length > 3);
  }

  buscarUsuarios(): void {
    this.usuarios = [];
    this.subscriptions.push(this.service.buscarUsuariosAsistencia(this.busqueda)
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
      }));
  }

  onSelected(usuario: Usuario): void {
    console.log('evento');
    this.seleccionado.emit(usuario);
  }

}
