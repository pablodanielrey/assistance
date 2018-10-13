import { Component, OnInit } from '@angular/core';

import { Justificacion } from '../../entities/asistencia';

import { AssistanceService } from '../../assistance.service';
import { NotificacionesService } from '../../notificaciones.service';
import {Location} from '@angular/common';

import { DialogoEliminarJustificacionComponent } from '../dialogo-eliminar-justificacion/dialogo-eliminar-justificacion.component';
import { MatDialog, MatDialogRef } from '@angular/material';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-justificacion-modificar',
  templateUrl: './justificacion-modificar.component.html',
  styleUrls: ['./justificacion-modificar.component.css']
})
export class JustificacionModificarComponent implements OnInit {

  subscriptions: any[] = [];
  justificacion: Justificacion = null;
  justificacion_id: string = null;
  nuevo: boolean = true;

  eliminarJustificacionDialogRef: MatDialogRef<DialogoEliminarJustificacionComponent>;

  constructor(private service: AssistanceService,
              private notificaciones: NotificacionesService,
              private location: Location,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.justificacion_id = params.get('jid');
    this.obtenerJustificacion();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  obtenerJustificacion() {
    if (this.justificacion_id == null) {
      this.justificacion = new Justificacion({general:false});
      return;
    }

    this.nuevo = false;
    this.subscriptions.push(this.service.obtenerJustificacion(this.justificacion_id)
      .subscribe(j => {
        this.justificacion = j;
      }));

  }

  guardar() {
    if (this.nuevo) {
      this.subscriptions.push(this.service.crearJustificacion(this.justificacion)
        .subscribe(r => {
          this.notificaciones.show("Se ha creado la justificacion " + this.justificacion.nombre);
          this.volver();
        }));
    } else {
      this.subscriptions.push(this.service.modificarJustificacion(this.justificacion)
        .subscribe(r => {
          this.notificaciones.show("Se ha modificado la justificacion " + this.justificacion.nombre);
          this.volver();
        }));
    }
  }

  volver() {
    this.location.back();
  }

  cancelar() {
    this.volver();
  }

  eliminar() {
    if (this.nuevo) {
      return
    }

    this.eliminarJustificacionDialogRef = this.dialog.open(DialogoEliminarJustificacionComponent, {data: this.justificacion});
    this.eliminarJustificacionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.service.eliminarJustificacion(this.justificacion_id)
          .subscribe(r => {
            this.notificaciones.show("Se ha eliminado la justificacion " + this.justificacion.nombre);
            this.volver();
          }));
      }
    });

  }


}
