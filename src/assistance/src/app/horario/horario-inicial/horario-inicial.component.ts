import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Usuario } from '../../entities/usuario';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-horario-inicial',
  templateUrl: './horario-inicial.component.html',
  styleUrls: ['./horario-inicial.component.css']
})
export class HorarioInicialComponent implements OnInit {

  usuarios: any = [];
  busqueda:string = "";
  subscriptions: any[] = [];

  constructor(public service: AssistanceService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  buscarUsuarios(): void {
    this.usuarios = [];
    this.busqueda = this.busqueda.replace('\.','');
    this.subscriptions.push(this.service.buscarUsuarios(this.busqueda)
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
