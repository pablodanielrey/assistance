import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ReporteJustificaciones } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-reporte-justificaciones',
  templateUrl: './reporte-justificaciones.component.html',
  styleUrls: ['./reporte-justificaciones.component.css']
})
export class ReporteJustificacionesComponent implements OnInit {
  buscando: boolean = false;
  back: string;
  usuario_id: string = null;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  reporte: ReporteJustificaciones = null;
  subscriptions: any[] = []; 
  
  constructor(
              private service: AssistanceService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.buscando = false;
    this.route.params.subscribe(params => {
      console.log('parametros cambiaron');
      console.log(params);
      this.usuario_id = params['uid'];
      this.back = (params['back']) ? params['back'] : '/sistema/reportes/justificaciones';
      if (params['fecha_inicial'] && params['fecha_final']) {
        this.fecha_inicial = new Date(params['fecha_inicial']);
        this.fecha_final = new Date(params['fecha_final']);
      } else {
         this.fecha_final = new Date(Date.now());
         this.fecha_inicial = new Date(this.fecha_final.getFullYear(), 0, 1);
         console.log(this.fecha_inicial);
         console.log(this.fecha_final);
      }
    });
    this._generarReporte();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.router.navigate([this.back, {fecha: this.fecha_final}]);
  }

  _generarReporte(): void {
    this.reporte = null;
    this.buscando = true;
    this.subscriptions.push(this.service.generarReporteJustificaciones(this.usuario_id, this.fecha_inicial, this.fecha_final)
    .subscribe(r => {
      this.buscando = false;
      this.reporte = r;
      console.log(this.reporte);
    }));
  }

}
