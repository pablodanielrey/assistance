import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../assistance.service';

import { DatosHorario, Horario } from '../entities/asistencia';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario-modificar',
  templateUrl: './horario-modificar.component.html',
  styleUrls: ['./horario-modificar.component.css']
})
export class HorarioModificarComponent implements OnInit {
  usuario_id: string = null;
  fecha: Date = new Date();
  subscriptions: any[] = [];
  info: DatosHorario = null;

  constructor(private service: AssistanceService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    this.usuario_id = params.get('uid');
    this.fecha = new Date(paramsQ.get('fecha'));

    this.obtenerHorario();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  cambio(event: any, h: Horario) {
    if (event.target.valueAsDate == null) {
        h.hora_entrada = 0;
        h.setEntrada(0);
        h.cantidadHoras = 0;
        return
    }
    let millis = event.target.valueAsNumber;
    let sec = millis / 1000;
    h.hora_entrada = sec;
    h.setEntrada(sec);
  }

  obtenerHorasSemanales() {
    let hs = 0;
    if (this.info == null) {
      return 0
    }
    for (let i = 0; i < this.info.horarios.length; i++) {
      hs = hs + this.info.horarios[i].cantidadHoras;
    }
    return hs
  }

  obtenerHorario() {
    this.subscriptions.push(this.service.obtenerHorario(this.usuario_id, this.fecha)
    .subscribe(r => {
      this.info = r;
      this.info.horarios.sort((h1, h2):number => {
        if (h1.dia_semanal == null) return -1;
        if (h2.dia_semanal == null) return 1;
        return h1.dia_semanal - h2.dia_semanal
      });
    }));
  }

  guardar() {
    for (let i=0; i < this.info.horarios.length; i++) {
      let h = this.info.horarios[i];
      console.log(h.obtenerDiaSemanal() + " " + h.entrada + "  --- HS:" + h.cantidadHoras);
    }
  }

}
