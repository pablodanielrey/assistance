import { Component, OnInit } from '@angular/core';
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
  busqueda:string = "";
  busquedaActivada: boolean = false;
  subscriptions: any[] = [];
  inicio: Date;
  fin: Date;

  constructor(public service: AssistanceService) {
  }

  ngOnInit() {
    this.fin = new Date(Date.now());
    this.inicio = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) );
    console.log('Inicio:' + this.inicio);
    console.log('Fin:' + this.fin);
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

}
