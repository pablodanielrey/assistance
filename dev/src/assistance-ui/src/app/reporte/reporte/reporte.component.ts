import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';

import { OAuthService } from 'angular-oauth2-oidc';

import { Reporte, RenglonReporte, Marcacion, FechaJustificada, Configuracion } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

import { DialogoEliminarFechaJustificadaComponent } from '../dialogo-eliminar-fecha-justificada/dialogo-eliminar-fecha-justificada.component';
import { Oauth2Service } from 'src/app/oauth2/oauth2.service';



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  height;
  width;
  navEnd: Observable<NavigationEnd>;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }

  constructor(private oauthService: OAuthService,
              private Oauth2Service: Oauth2Service,
              private service: AssistanceService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private location: Location) {

      this.onResize();
      this.reportes = new BehaviorSubject<RenglonReporte[]>([]);

      /*
      this.navEnd = router.events.pipe(
        filter(evt => evt instanceof NavigationEnd)
      ) as Observable<NavigationEnd>;
      this.navEnd.subscribe(n => this._generarReporte());
      */
  
  }

  eliminarJustificacionDialogRef: MatDialogRef<DialogoEliminarFechaJustificadaComponent>;

  reporte: Reporte = null;
  reportes : BehaviorSubject<RenglonReporte[]> = null;
  info: any = null;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  usuario_id: string = null;
  
  subscriptions: any[] = [];
  buscando: boolean = false;
  back: string;
  modulos: string[] = [];
  config: Configuracion = null;

  ngOnInit() {
    this.buscando = false;

    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
    }));

    this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
      this.config = r;
    }));

    //this.usuario_id$ = this.route.paramMap.pipe(map(params => params.get('uid')));
    this.route.paramMap.subscribe(params => {
      this.usuario_id = params.get('uid');
      this._generarReporte();
    });

    this.route.queryParamMap.subscribe(parameters => {
      this.back = (parameters.get('back')) ? atob(parameters.get('back')) : '/sistema/reportes/personal';
      if (parameters.get('fecha_inicial') && parameters.get('fecha_final')) {
        this.fecha_inicial = new Date(parameters.get('fecha_inicial'));
        this.fecha_final = new Date(parameters.get('fecha_final'));
      } else {
        this.fecha_inicial = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) );
        this.fecha_final = new Date(Date.now());
      }
      this._generarReporte();
    });

    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.router.navigate([this.back, {fecha: this.fecha_final}]);
  }

  _generarReporte(): void {
    if (this.usuario_id == null || this.fecha_final == null || this.fecha_final == null) {
      console.log('no están cargados los parámetros');
      return;
    }
    this.reporte = null;
    this.buscando = true;
    this.subscriptions.push(this.service.generarReporte(this.usuario_id, this.fecha_inicial, this.fecha_final)
    .subscribe(r => {
      this.buscando = false;
      this.reporte = r;
      this.reportes.next(r.reportes);
    }));
  }

  generarReporte():void {
    this.router.onSameUrlNavigation = 'reload';
    let params = {
      fecha_inicial:this.fecha_inicial.toISOString(), 
      fecha_final:this.fecha_final.toISOString(), 
      back: btoa(this.back)
    };
    this.router.navigate(['/sistema/reportes/personal', this.usuario_id], {queryParams:params}).then(b => {
      if (!b) {
        this._generarReporte(); 
      }
    });
  }

  obtenerMarcacionesIndividuales(r: RenglonReporte): string {
    let marcaciones = ''
    r.marcaciones.forEach(m => marcaciones = marcaciones +'<br>' + m.marcacion);
    return marcaciones;
  }

  generarBack(r: RenglonReporte) {
    let back = {
      url: '/sistema/reportes/personal/' + this.usuario_id,
      params: {
        fecha_inicial:this.fecha_inicial.toISOString(),
        fecha_final:this.fecha_final.toISOString()
      }
    }; 
    let sjson = btoa(JSON.stringify(back));
    return {back:sjson};
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
    if (!this.config.mostrar_tipo_marcacion) {
      return null;
    }
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

  obtenerUsuario():string {
    if (this.reporte && this.reporte.usuario) {
      return this.reporte.usuario.dni;
    } else {
      return "";
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

  obtenerHorasString(minutos:number) {
    let min = Math.trunc(minutos % 60);
    let hs = Math.trunc(minutos / 60);
    return String(hs) + ":" + String(min);
  }

  obtenerReportes() {
    if (this.reporte ==  null) {
      return []
    }
    return this.reporte.reportes;
  }

  eliminarJustificacion(justificacion:any) {
    this.eliminarJustificacionDialogRef = this.dialog.open(DialogoEliminarFechaJustificadaComponent, {data: justificacion});
    this.eliminarJustificacionDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.service.eliminarFechaJustificada(this.usuario_id, justificacion.id)
        .subscribe(r => {
          this.clearJustificaciones(r);
        }));
      }
    });
  }

  clearJustificaciones(jid: string) {
    this.reporte.reportes.forEach(r => r.justificaciones = this.eliminarJustificacionDeRenglon(r.justificaciones, jid));
    console.log(this.reporte.reportes);
  }

  eliminarJustificacionDeRenglon(justificaciones: FechaJustificada[], jid): Array<any> {
    return justificaciones.filter(j => j.id != jid);;
  }

  is_desktop() {
    return this.width >= 769;
  }

  chequearPerfil(profiles: string[]): boolean {
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        r = true; 
      }
    });
    return r
  }

  accesoARemoverJustificaciones(r: Reporte): boolean {
    if (this.chequearPerfil(['super-admin'])) {
      return true;
    }
    let uid = this.Oauth2Service.getId();
    if (uid == r.usuario.id) {
      return false;
    }
    return this.chequearPerfil(['justificacion_personal_abm','justificacion_general_abm']);
  }

  accesoAJustificaciones(r: Reporte): boolean {
    if (this.chequearPerfil(['super-admin'])) {
      return true;
    }
    let uid = this.Oauth2Service.getId();
    if (uid == r.usuario.id) {
      return false;
    }
    return this.chequearPerfil(['justificacion_personal_abm','justificacion_general_abm']);
  }

}
