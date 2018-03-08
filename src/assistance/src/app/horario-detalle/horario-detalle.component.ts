import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../assistance.service';

import { DatosHorario } from '../entities/asistencia';


import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-horario-detalle',
  templateUrl: './horario-detalle.component.html',
  styleUrls: ['./horario-detalle.component.css']
})
export class HorarioDetalleComponent implements OnInit {

  usuario_id: string = null;
  fecha: Date = new Date();
  subscriptions: any[] = [];
  info: DatosHorario; = null;

  constructor(private service: AssistanceService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.usuario_id = params.get('uid');
    this.obtenerHorario();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  obtenerHorario() {
    this.subscriptions.push(this.service.obtenerHorario(this.usuario_id, this.fecha)
    .subscribe(r => {
      console.log(r);
      this.info = r;
      this.info.horarios.sort((h1, h2):number => {
        if (h1.dia_semanal == null) return -1;
        if (h2.dia_semanal == null) return 1;
        return h1.dia_semanal - h2.dia_semanal
      });
      console.log(this.info.horarios);
    }));

  }



}
