import { Component, OnInit } from '@angular/core';


import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistanceService } from '../assistance.service';

import { Usuario } from '../entities/usuario';
import { Perfil } from '../entities/asistencia';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  fecha: Date = new Date();
  usuario: Usuario;
  info: any;
  subscriptions: any[] = [];
  cargando: boolean = false;

  perfil: Perfil;

  oficinas=[
    {
      'nombre':'DiTeSI',
      'cargo':'E7'
    }
  ]

  constructor(private router: Router,
              private route: ActivatedRoute,
              private oauthService: OAuthService,
              private service: AssistanceService) {

              }

  ngOnInit() {
    this.info = this.oauthService.getIdentityClaims();
    this.cargando = false;
    // TODO: consultar la entidad usuario correcta.
    this.usuario = new Usuario(
      {
        id: this.info.sub,
        nombre: this.info.name
      }
    );
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['fecha']) {
        this.fecha = new Date(params['fecha']);
        this._actualizarPerfil();
      } else {
         this.fecha = new Date(Date.now());
         this.actualizarPerfil(null);
      }
    });
  }


  actualizarPerfil(event):void {
    this.router.navigate(['/sistema/miperfil', {fecha:this.fecha.toISOString()}]);
  }

  _actualizarPerfil() {
    this.cargando = true;
    this.subscriptions.push(this.service.miPerfil(this.usuario.id, this.fecha)
    .subscribe(r => {
      this.perfil = r;
      this.usuario = this.perfil.usuario;
      console.log(r);
      this.cargando = false;
    }));
  }

  _obtener_horario(d:Date) {
    if (d) {
      return this.perfil._fecha_a_hora(d);
    } else {
      return " - ";
    }
  }

  obtener_hora_entrada() {
    return this._obtener_horario(this.perfil.entrada);
  }

  obtener_hora_salida() {
    return this._obtener_horario(this.perfil.salida);
  }

   obtener_horas_trabajadas() {
    if (this.perfil.segundos_trabajados && this.perfil.segundos_trabajados > 0) {
      return this.perfil.horas_trabajadas();
    } else {
      return " - ";
    }
  }

  obtener_horario_entrada() {
    return this._obtener_horario(this.perfil.hora_entrada);
  }

  obtener_horario_salida() {
    return this._obtener_horario(this.perfil.hora_salida);
  }

  obtener_horario_horas() {
    if (this.perfil.horario_segundos && this.perfil.horario_segundos > 0) {
      return this.perfil._segundos_a_hora(this.perfil.horario_segundos);
    } else {
      return " - ";
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }



  obtener_fecha_final() {
    return this.fecha.toISOString();
  }

  obtener_fecha_inicial() {
    let data = (new Date(this.fecha.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString());
    return data;
  }

  ver_reporte() {
    this.router.navigate(['/sistema/reportes/personal/' + this.usuario.id,
      {
        fecha_inicial:this.obtener_fecha_inicial(),
        fecha_final:this.obtener_fecha_final(),
        back: '/sistema/miperfil'
      }
    ]);
  }

}
