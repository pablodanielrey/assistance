import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Horario } from '../../entities/asistencia';
import { ActivatedRoute } from '@angular/router';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-horario-historico',
  templateUrl: './horario-historico.component.html',
  styleUrls: ['./horario-historico.component.css']
})
export class HorarioHistoricoComponent implements OnInit {

  usuario_id: string = null;
  horarios: Horario[] = [];
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
  }

  restaurar(h: Horario) {
    h.eliminado = null;
  }

  obtenerHorarios() {
    this.subscriptions.push(this.service.obtenerHorariosHistorico(this.usuario_id)
    .subscribe(h => {
      this.horarios = h;
      console.log(h);
    }));
  }

}
