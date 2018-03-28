import { Component, OnInit } from '@angular/core';

import { Lugar } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'


@Component({
  selector: 'app-reporte-general-inicial',
  templateUrl: './reporte-general-inicial.component.html',
  styleUrls: ['./reporte-general-inicial.component.css']
})
export class ReporteGeneralInicialComponent implements OnInit {

  lugares: Lugar[] = [];
  busqueda:string = "";
  subscriptions: any[] = [];
  seleccionados: Lugar[] = [];
  fecha: Date;


  constructor(private location: Location,
              private router: Router,
              public service: AssistanceService) { }

  ngOnInit() {
    this.fecha = new Date();
    this.buscarLugares();
  }

  buscarLugares() {
    this.lugares = [];
    this.seleccionados = [];
    this.subscriptions.push(this.service.buscarLugares(null)
      .map(lugares => lugares.filter(l => l.tipo != 'catedra' && l.tipo != 'lugar dictado'))
      .map(lugares => lugares.sort((a,b) => {return a.tipo.localeCompare(b.tipo)}))
      .subscribe(lugares => {
        console.log(lugares);
        this.lugares = lugares;
      }));
  }

  seleccionarLugar(lugares: Lugar[]) {
    this.seleccionados = lugares;
  }

  volver() {
    this.location.back();
  }

  generarReporte() {
    let ids = this.seleccionados.map(item => item.id);
    this.router.navigate(['reportes/general/generar'], { queryParams: {ids: ids, fecha: this.fecha} });
  }

}
