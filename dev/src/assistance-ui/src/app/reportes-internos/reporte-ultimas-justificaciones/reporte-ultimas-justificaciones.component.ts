import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap, mergeMap, reduce, scan, map } from 'rxjs/operators';


import { ReportesInternosService } from 'src/app/reportes-internos.service';
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
  columnasActivas = ['Inicio', 'Fin', 'Creador', 'Persona', 'Oficina', 'Justificacion'];
  oficinas$ = null;
  cantidad_oficinas$ = null;
  cargando$ = null;
  procesando$ = null;

  constructor(service: ReportesInternosService) {

    this.cargando$ = new BehaviorSubject<Boolean>(false);
    this.procesando$ = new BehaviorSubject<Boolean>(false);

    this.justificaciones$ = this.generar$.pipe(
      tap(v => this.cargando$.next(true)),
      switchMap(v => service.ultimasJustificaciones(v)),
      tap(v => {this.cargando$.next(false); this.procesando$.next(true)}),
      tap(v => console.log(v))
    );
    this.oficinas$ = this.justificaciones$.pipe(
      map(vs => {
          let a = {};
          for (let fj of vs) {
            if ('usuario' in fj) {
              for (let o of fj.usuario.oficinas) {
                if (o in a) {
                  a[o] = a[o] + 1;
                } else {
                  a[o] = 1;
                }
              }
            }
          }
          return a;
        }
      ),
      map(vs => {
        let a = [];
        for (let k of Object.keys(vs)) {
          a.push({nombre:k, cantidad:vs[k]})
        }
        return a.sort((a1,a2) => a2.cantidad - a1.cantidad);
      }),
      /*
      scan((a, vs: any[]) => {
        console.log('recibi');
        console.log(vs);
        for (let v of vs) {
          if ('usuario' in v) {
            for (let v1 of v.usuario.oficinas) {
              let encontrado = false;
              for (let off of a) {
                if (off.nombre == v1) {
                  off.cantidad = off.cantidad + 1;
                  encontrado = true;
                }
              }
              if (!encontrado) {
                a.push({ nombre: v1, cantidad: 1 });
              }
            }
          }
        }
        console.log('retorno');
        console.log(a);
        return a;
      }, []),*/
      tap(v => this.procesando$.next(false)),
      tap(v => console.log(v)));

      this.cantidad_oficinas$ = this.oficinas$.pipe(
        map((vs:any[]) => {return vs.length;})
      );
  }

  ngOnInit() {
  }

  generar() {
    this.generar$.next(this.cantidad);
  }

}
