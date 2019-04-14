import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ReporteJustificaciones, FechaJustificada, Configuracion } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

import { ExportacionesService } from '../../exportaciones.service';

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

  fechasJustificadas : BehaviorSubject<FechaJustificada[]>;
  columnasActivas: string[] = ['Inicio','Fin','Justificacion','Notas','Creada'];
  fechasEliminadas : BehaviorSubject<FechaJustificada[]>;  
  columnasEliminadas: string[] = ['Inicio','Fin','Justificacion','Notas','Eliminada'];

  config: Configuracion = null;
  //stock: any[] = [
  //                            {id: '1',
  //                            nombre: 'Boleta de Salida',
  //                            cantidad: 2 },
  //                            {id: '2',
  //                            nombre: 'Ausentes con Aviso',
  //                            cantidad: 3 },
  //                            {id: '3',
  //                            nombre: 'Vacaciones',
  //                            cantidad: 25 }
  //                          ] Comentado para futura implementacion de Stock, EJEMPLO
  
  constructor(
              private service: AssistanceService,
              private route: ActivatedRoute,
              private router: Router,
              private exportaciones: ExportacionesService) {
    this.fechasJustificadas = new BehaviorSubject<FechaJustificada[]>([]);
    this.fechasEliminadas = new BehaviorSubject<FechaJustificada[]>([]);
  }

  ngOnInit() {
    this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
      this.config = r;
      if (this.config.mostrar_creador_justificaciones){
        this.columnasActivas.push('Creador');
        this.columnasEliminadas.splice(4, 0, 'Creador');
      }
      if (this.config.mostrar_eliminador_justificaciones){
        this.columnasEliminadas.push('Eliminador');
      }
    }));
    this.buscando = false;
    this.route.params.subscribe(params => {
      console.log(params);
      this.usuario_id = params['uid'];
      this.back = (params['back']) ? params['back'] : '/sistema/reportes/justificaciones';
      if (params['fecha_inicial'] && params['fecha_final']) {
        this.fecha_inicial = new Date(params['fecha_inicial']);
        this.fecha_final = new Date(params['fecha_final']);
      } else {
         this.fecha_final = new Date(Date.now());
         this.fecha_inicial = new Date(this.fecha_final.getFullYear(), 0, 1);
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
      this.fechasJustificadas.next(r.justificaciones);
      this.fechasEliminadas.next(r.justificaciones_eliminadas);
    }));
  }

  obtenerDias(ini:Date, fin:Date): number {
    return (Math.floor((Date.UTC(fin.getFullYear(), fin.getMonth(), fin.getDate()) - Date.UTC(ini.getFullYear(), ini.getMonth(), ini.getDate()) ) /(1000 * 60 * 60 * 24))+1);
  }

  exportarExcelAtoA():void {
    /*
    * Crea un arreglo por linea a esribir en el xlsx y lo envia al service de creacion para exportacion.
    */
    if (this.reporte != null){
      let reporte = [
        ['Informe Generado','Apellido','Nombre','DNI','Inicio','Fin'],
        [
         new Date().toLocaleString(),
         this.reporte.usuario.apellido,
         this.reporte.usuario.nombre,
         this.reporte.usuario.dni,
         new Date(this.reporte.fecha_inicial.getTime() + (1000*60*60*24)).toLocaleDateString(),
         new Date(this.reporte.fecha_final.getTime() + (1000*60*60*24)).toLocaleDateString()
        ],
        [],
        ['Justificaciones Personales'],
        ['Justificación','Cantidad']
      ]
      this.reporte.suma_justificaciones.forEach( j => {
        reporte.push([j.nombre+'('+j.codigo+')', j.cantidad.toString()])
      });
      reporte.push(
        [],
        ['Justificaciones Generales']
      )
      this.reporte.suma_justificaciones_generales.forEach( j => {
        reporte.push([j.nombre+'('+j.codigo+')', j.cantidad.toString()])
      });
      reporte.push(
        [],
        ['Detalle Justificaciones'],
        ['Justificación','Inicio','Fin','Días','Notas','Creada']
      )
      this.reporte.justificaciones.forEach( j => {
        reporte.push([
          j.justificacion.nombre+'('+j.justificacion.codigo+')',
          j.fecha_inicio.toLocaleDateString(),
          (j.fecha_fin)? (j.fecha_fin.toLocaleDateString()) : (''),
          (j.fecha_fin)? (this.obtenerDias(j.fecha_inicio,j.fecha_fin).toString()) : ('1'),
          j.notas,
          j.creado.toLocaleDateString()
        ])
      })
      let titulo = 'Reporte-Justificaciones-'+this.reporte.usuario.apellido.charAt(0).toUpperCase()+this.reporte.usuario.apellido.slice(1).toLowerCase();
      this.exportaciones.exportarArregloAExcel(reporte, titulo);
    }
  }
}
