import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap, mergeMap, reduce, scan, map } from 'rxjs/operators';


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
  columnasActivas = ['Inicio', 'Fin', 'Creador', 'Persona', 'Oficina', 'Justificacion'];
  oficinas$ = null;
  cantidad_oficinas$ = null;

  constructor(service: AssistanceService) {
    this.justificaciones$ = this.generar$.pipe(
      switchMap(v => service.ultimasJustificaciones(v)),
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
        return a;
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
      tap(v => console.log(v)));

      this.cantidad_oficinas$ = this.oficinas$.pipe(
        map(vs => {return vs.length;})
      );
  }

  ngOnInit() {
  }

  generar() {
    this.generar$.next(this.cantidad);
  }

}
