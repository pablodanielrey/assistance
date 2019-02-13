import { Component, OnInit } from '@angular/core';

import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-compensatorios-inicial',
  templateUrl: './compensatorios-inicial.component.html',
  styleUrls: ['./compensatorios-inicial.component.css']
})
export class CompensatoriosInicialComponent implements OnInit {
  usuarios: any = [];
  busqueda:string = "";
  subscriptions: any[] = [];
  cargando: boolean = false;

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
    this.cargando = true;
    this.subscriptions.push(this.service.buscarUsuarios(this.busqueda)
      .subscribe(usuarios => {
        usuarios.sort((a,b) => {
          var aFull = (a.nombre + a.apellido).toLowerCase()
          var bFull = (b.nombre + b.apellido).toLowerCase()
          if (aFull > bFull) {
            return 1
          }
          if (aFull < bFull) {
            return -1
          }
          return 0
        });
        this.usuarios = usuarios;
        this.cargando = false;
      }));
  }

}
