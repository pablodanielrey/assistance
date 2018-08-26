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

  perfil: Perfil;

  oficinas=[
    {
      'nombre':'DiTeSI',
      'cargo':'E7'
    }
  ]

  constructor(private router: Router,
              private oauthService: OAuthService,
              private service: AssistanceService) { 

              }

  ngOnInit() {
    this.info = this.oauthService.getIdentityClaims();
    // TODO: consultar la entidad usuario correcta.
    this.usuario = new Usuario(
      {
        id: this.info.sub,
        nombre: this.info.name
      }
    );
    this.actualizarPerfil(null);
  }

  actualizarPerfil(event) {
    console.log(event);
    this.subscriptions.push(this.service.miPerfil(this.usuario.id, this.fecha)
    .subscribe(r => {
      this.perfil = r;
      this.usuario = this.perfil.usuario;
      console.log(r);
    }));
  }

  _obtener_horario(d:Date) {
    if (d) {
      return this.perfil.fecha2hora(d);
    } else {
      return "";
    }
  }

  obtener_hora_entrada() {
    return this._obtener_horario(this.perfil.entrada);
  }

  obtener_hora_salida() {
    return this._obtener_horario(this.perfil.salida);
  }

  obtener_horas_trabajadas() {
    if (this.perfil.segundos_trabajados) {
      let n = this.perfil.segundos_trabajados;
      return (n / 60 / 60) + ":" + (n / 60 % 60);
    } else {
      return "00:00";
    }
  }

  obtener_horario_entrada() {
    return this._obtener_horario(this.perfil.hora_entrada);
  }

  obtener_horario_salida() {
    return this._obtener_horario(this.perfil.hora_salida);
  }

  obtener_horario_horas() {
    if (this.perfil.segundos_trabajados) {
      let n = this.perfil.segundos_trabajados;
      return (n / 60 / 60) + ":" + (n / 60 % 60);
    } else {
      return "00:00";
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
        fecha_final:this.obtener_fecha_final()
      }
    ]);
  }

}
