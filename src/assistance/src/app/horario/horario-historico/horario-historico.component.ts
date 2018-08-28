import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Horario, HistorialHorario, DetalleHistorialHorario } from '../../entities/asistencia';
import { ActivatedRoute } from '@angular/router';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-horario-historico',
  templateUrl: './horario-historico.component.html',
  styleUrls: ['./horario-historico.component.css']
})
export class HorarioHistoricoComponent implements OnInit {

  buscando: boolean = false;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  usuario_id: string = null;
  historial: HistorialHorario;
  horarios: DetalleHistorialHorario[] = [];
  subscriptions: any[] = [];
  displayedColumns: string[] = ['valido', 'dia', 'entrada', 'salida', 'eliminado', 'creador'];

  constructor(private service: AssistanceService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.usuario_id = params.get('uid');
    this.obtenerHorarios();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  eliminar(h: Horario) {
    h.eliminado = new Date()
    this.subscriptions.push(this.service.eliminarHorario(this.usuario_id, h.id)
    .subscribe(r => {
      if (r.status == 'ok') {
        h.eliminado = new Date();
      }
      console.log(h);
    }, e => {
      console.log(e);
    }));
  }

  restaurar(h: Horario) {
    h.eliminado = null;
  }

  obtenerHorarios() {
    this.subscriptions.push(this.service.obtenerHorariosHistorico(this.usuario_id)
    .subscribe(h => {
      this.historial = h;
      this.horarios = h.historial;
      console.log(h);
    }));
  }

}
