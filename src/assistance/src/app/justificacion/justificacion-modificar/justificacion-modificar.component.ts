import { Component, OnInit } from '@angular/core';

import { Justificacion } from '../../entities/asistencia';

import { AssistanceService } from '../../assistance.service';
import {Location} from '@angular/common';

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

  constructor(private service: AssistanceService,
              private location: Location,
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
          console.log(r);
        }));
    } else {
      this.subscriptions.push(this.service.modificarJustificacion(this.justificacion)
        .subscribe(r => {
          console.log(r);
        }));
    }
  }

  cancelar() {
    this.location.back();
  }

  eliminar() {
    if (this.nuevo) {
      return
    }

    this.subscriptions.push(this.service.eliminarJustificacion(this.justificacion_id)
      .subscribe(r => {
        console.log(r);
      }));
  }


}
