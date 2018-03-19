import { Component, OnInit } from '@angular/core';

import { Usuario } from '../entities/usuario';
import { DatosAsistencia } from '../entities/asistencia';

import { AssistanceService } from '../assistance.service';


@Component({
  selector: 'app-justificacion-personal-inicio',
  templateUrl: './justificacion-personal-inicio.component.html',
  styleUrls: ['./justificacion-personal-inicio.component.css']
})
export class JustificacionPersonalInicioComponent implements OnInit {

  usuarios: Array<DatosAsistencia> = new Array<DatosAsistencia>();
  subscriptions: any[] = [];

  constructor(public service: AssistanceService) { }

  ngOnInit() {
  }

  seleccionarUsuario(event) {
    console.log(event);
  }

  buscar(event) {
    this.usuarios = [];
    this.subscriptions.push(this.service.buscarUsuariosAsistencia(event)
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
      }));
  }

}
