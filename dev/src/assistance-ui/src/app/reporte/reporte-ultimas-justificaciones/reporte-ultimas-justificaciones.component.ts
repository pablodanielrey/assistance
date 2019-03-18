import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';


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

  constructor(service: AssistanceService) {
    this.justificaciones$ = this.generar$.pipe(
      switchMap(v => service.ultimasJustificaciones(v))
    )
  }

  ngOnInit() {
  }

  generar() {
    this.generar$.next(this.cantidad);
  }

}
