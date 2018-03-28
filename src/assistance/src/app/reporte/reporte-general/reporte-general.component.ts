import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteGeneral } from '../../entities/asistencia';

import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  subscriptions: any[] = [];
  fecha: Date;
  ids: string[];
  reportes: Array<ReporteGeneral> = [];

  constructor(private route: ActivatedRoute,
              private service: AssistanceService) { }

  ngOnInit() {
    this.subscriptions.push(this.route
      .queryParams
      .subscribe(params => {
        this.ids = params['ids'] || [];
        this.fecha = new Date(params['fecha']) || null;
      }));
    this.generarReporte();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  generarReporte() {
    this.reportes = [];
    this.subscriptions.push(this.service.generarReporteGeneral(this.ids, this.fecha)
    .subscribe(r => {
      this.reportes = r;
      console.log(r);
    }));
  }

}
