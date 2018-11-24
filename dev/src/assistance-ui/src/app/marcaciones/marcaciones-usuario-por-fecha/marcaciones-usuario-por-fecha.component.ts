import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reporte, RenglonReporte, Marcacion } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-marcaciones-usuario-por-fecha',
  templateUrl: './marcaciones-usuario-por-fecha.component.html',
  styleUrls: ['./marcaciones-usuario-por-fecha.component.css']
})
export class MarcacionesUsuarioPorFechaComponent implements OnInit {
  usuario_id: string = null;
  fecha: Date = null;
  cargando: boolean = false;
  reporte: Reporte = null;
  renglon_reporte: RenglonReporte = null;
  subscriptions: any[] = [];
  back: string = null;
  fecha_inicial: string = null;
  fecha_final: string = null;
  

  constructor(private route : ActivatedRoute,
              private router: Router,
              private service : AssistanceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.usuario_id = p.get('uid');
      this.fecha = new Date(p.get('fecha'));
      this.back = p.get('back') ? p.get('back') : '/sistema/reportes/personal/';
      this.fecha_inicial = p.get('fecha_inicial');
      this.fecha_final = p.get('fecha_final');
      this.cargando = true;
      this.subscriptions.push(this.service.generarReporte(this.usuario_id, this.fecha, this.fecha)
      .subscribe(r => {
        this.cargando = false;
        this.reporte = r;
        this.renglon_reporte = r.reportes.pop();
        console.log(this.reporte);
      }));
    });    
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    if (this.fecha_inicial != null && this.fecha_final != null) {
      this.router.navigate([this.back, this.usuario_id, {fecha_inicial: this.fecha_inicial, fecha_final: this.fecha_final}]);
    }else{
      this.router.navigate([this.back, this.usuario_id]);
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
