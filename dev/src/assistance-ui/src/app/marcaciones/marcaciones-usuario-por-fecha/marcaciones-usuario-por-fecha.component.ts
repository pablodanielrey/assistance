import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { RenglonReporte, Marcacion, Configuracion } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-marcaciones-usuario-por-fecha',
  templateUrl: './marcaciones-usuario-por-fecha.component.html',
  styleUrls: ['./marcaciones-usuario-por-fecha.component.css']
})
export class MarcacionesUsuarioPorFechaComponent implements OnInit {
  usuario_id: string = null;
  cargando: boolean = false;
  subscriptions: any[] = [];
  back: any = null;
  info: any = null;
  fecha_inicial: string = null;
  fecha_final: string = null;
  config: Configuracion = null;
  columnas: string[] = ['Dia','Fecha','Marcacion','Reloj'];

  marcaciones : BehaviorSubject<Marcacion[]>;
  marcaciones_duplicadas : BehaviorSubject<Marcacion[]>;
  

  constructor(private route : ActivatedRoute,
              private router: Router,
              private service : AssistanceService) {
    this.marcaciones = new BehaviorSubject<Marcacion[]>([]);
    this.marcaciones_duplicadas = new BehaviorSubject<Marcacion[]>([]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.usuario_id = p.get('uid');

      this.back = {
        url: p.get('back') ? p.get('back') : '/sistema/reportes/personal/',
        fecha_inicial: p.get('fecha_inicial'),
        fecha_final: p.get('fecha_final')
      }

      let fecha = new Date(p.get('fecha'));
      this.cargando = true;
      
      this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
        this.config = r;
        if (this.config.mostrar_tipo_marcacion) {
          this.columnas.push('Tipo');
        }
      }));


      this.subscriptions.push(this.service.generarReporte(this.usuario_id, fecha, fecha).subscribe(r => {
        this.cargando = false;
        let renglon_reporte = r.reportes.pop();

        this.info = {
          usuario: r.usuario,
          fecha: renglon_reporte.fecha,
          horario: this.obtenerHorario(renglon_reporte),
          horas_trabajadas: this.obtenerHorasTrabajadas(renglon_reporte)
        }
        this.marcaciones.next(renglon_reporte.marcaciones);
        this.marcaciones_duplicadas.next(renglon_reporte.duplicadas);
      }));
    });    
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    if (this.back.fecha_inicial != null && this.back.fecha_final != null) {
      this.router.navigate([this.back.url, this.usuario_id, {fecha_inicial: this.back.fecha_inicial, fecha_final: this.back.fecha_final}]);
    }else{
      this.router.navigate([this.back.url, this.usuario_id]);
    }
  }

  obtenerHorario(r: RenglonReporte): string {
    if (r.horario && (r.horario.hora_salida - r.horario.hora_entrada > 0)) {
      let e = new Date(r.fecha.getTime()); e.setSeconds(0); e.setMinutes(0); e.setHours(0);
      let s = new Date(e.getTime());
      e.setSeconds(r.horario.hora_entrada);
      s.setSeconds(r.horario.hora_salida);
      return e.toLocaleTimeString().substring(0,5) + " - " + s.toLocaleTimeString().substring(0,5);
    } else {
      return "";
    }
  }

  obtenerMarcacion(m: Marcacion): Date {
    if (m == null) {
      return null
    }
    return m.marcacion
  }

  obtenerIcono(m: Marcacion): String {
    if (m == null) {
      return null
    }
    if (m.tipo == 0) {
      return 'dialpad';
    }
    if (m.tipo == 1) {
      return 'fingerprint';
    }
    if (m.tipo == 3) {
      return 'laptop';
    }
  }

  obtenerDescripcionMarcacion(m: Marcacion): String{
    if (m == null) {
      return null
    }
    if (m.tipo == 0) {
      return 'Teclado';
    }
    if (m.tipo == 1) {
      return 'Huella';
    }
    if (m.tipo == 3) {
      return 'Remoto';
    }
  }

  obtenerHorasTrabajadas(r:RenglonReporte) {
    let segundos = r.cantidad_horas_trabajadas;
    let min = Math.trunc((segundos / 60) % 60);
    let hs = Math.trunc((segundos / 60) / 60);
    let a = '';
    let b = '';
    if (min < 10) {
      b = '0';
    }
    if (hs < 10) {
      a = '0';
    }
    return a + String(hs) + ":" + b + String(min);
  }

}
