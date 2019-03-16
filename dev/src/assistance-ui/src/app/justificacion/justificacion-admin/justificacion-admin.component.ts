import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AssistanceService } from '../../assistance.service';

import { Justificacion } from '../../entities/asistencia';


@Component({
  selector: 'app-justificacion-admin',
  templateUrl: './justificacion-admin.component.html',
  styleUrls: ['./justificacion-admin.component.css']
})
export class JustificacionAdminComponent implements OnInit {

  subscriptions: any[] = [];
  justificaciones: Justificacion[];
  cargando: boolean = false;

  constructor(public service: AssistanceService, private router: Router) { }

  ngOnInit() {
    this.buscarJustificaciones();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  buscarJustificaciones() {
    this.justificaciones = [];
    this.cargando = true;
    this.subscriptions.push(this.service.buscarJustificaciones('')
      .subscribe(justificaciones => {
        this.justificaciones = justificaciones;
        this.justificaciones.sort((a,b):number => {
          if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
          }
          if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
          }
          return 0
        });
        this.cargando = false;
      }));
  }

  seleccionarJustificacion(j: Justificacion) {
    this.router.navigate(['/sistema/justificaciones/admin/modificar/' + j.id]);
  }

}
