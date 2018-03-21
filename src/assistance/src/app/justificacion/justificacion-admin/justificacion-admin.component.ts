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
    this.subscriptions.push(this.service.buscarJustificaciones()
      .subscribe(justificaciones => {
        this.justificaciones = justificaciones;
      }));
  }

  seleccionarJustificacion(j: Justificacion) {
    this.router.navigate(['modificar_justificacion/' + j.id]);
  }

}
