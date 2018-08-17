import { Component, OnInit } from '@angular/core';


import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  fecha: Date = new Date();
  usuario: Usuario;
  info: any;

  oficinas=[
    {
      'nombre':'DiTeSI',
      'cargo':'E7'
    }
  ]

  justificaciones=[
    {
      'nombre':'Ausente con Aviso',
      'cantidad':'1'
    },
    {
      'nombre':'Boleta de Salida',
      'cantidad':'01:00'
    }
  ]


  constructor(private router: Router, private oauthService: OAuthService) { }

  ngOnInit() {
    this.info = this.oauthService.getIdentityClaims();
    // TODO: consultar la entidad usuario correcta.
    this.usuario = new Usuario(
      {
        id: this.info.sub, 
        nombre: this.info.name
      }
    );
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
