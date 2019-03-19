import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


import { AssistanceService } from 'src/app/assistance.service';
import { FechaJustificada } from 'src/app/entities/asistencia';


@Component({
  selector: 'app-reporte-ultimas-justificaciones',
  templateUrl: './reporte-ultimas-justificaciones.component.html',
  styleUrls: ['./reporte-ultimas-justificaciones.component.css']
})
export class ReporteUltimasJustificacionesComponent implements OnInit {

  justificaciones$: Observable<any[]>;
  cantidad: number = 10;
  generar$ = new BehaviorSubject<number>(this.cantidad);
  columnasActivas = ['Inicio','Fin','Creador','Persona','Justificacion'];

  constructor(service: AssistanceService) {
    this.justificaciones$ = this.generar$.pipe(
      tap(v => console.log(v)),
      switchMap(v => service.ultimasJustificaciones(v)),
      tap(v => console.log(v))
    )
  }

  ngOnInit() {
  }

  generar() {
    this.generar$.next(this.cantidad);
  }

}
