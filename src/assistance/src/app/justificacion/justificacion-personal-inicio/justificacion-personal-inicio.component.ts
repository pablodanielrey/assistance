import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Usuario } from '../../entities/usuario';
import { DatosAsistencia } from '../../entities/asistencia';

import { AssistanceService } from '../../assistance.service';


@Component({
  selector: 'app-justificacion-personal-inicio',
  templateUrl: './justificacion-personal-inicio.component.html',
  styleUrls: ['./justificacion-personal-inicio.component.css']
})
export class JustificacionPersonalInicioComponent implements OnInit {

  usuarios: Array<DatosAsistencia> = new Array<DatosAsistencia>();
  subscriptions: any[] = [];

  constructor(public service: AssistanceService, private router: Router) { }

  ngOnInit() {
  }

  seleccionarUsuario(event) {
    this.router.navigate(['/sistema/justificaciones/personal/' + event.id])
  }

  buscar(event) {
    this.usuarios = [];
    this.subscriptions.push(this.service.buscarUsuariosAsistencia(event)
      .subscribe(usuarios => {
        usuarios.sort((a,b) => {
          var aFull = (a.usuario.nombre + a.usuario.apellido).toLowerCase()
          var bFull = (b.usuario.nombre + b.usuario.apellido).toLowerCase()
          if (aFull > bFull) {
            return 1
          }
          if (aFull < bFull) {
            return -1
          }
          return 0
        });        
        this.usuarios = usuarios;
      }));
  }

}
