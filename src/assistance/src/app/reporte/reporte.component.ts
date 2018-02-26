import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';


import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(private oauthService: OAuthService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private location: Location) { }


  info: any = null;
  fecha_inicial: Date = null;
  fecha_final: Date = null;
  usuario_id: string = null;

  ngOnInit() {

    let params = this.route.snapshot.paramMap;
    this.fecha_inicial = new Date(params.get('fecha_ini'));
    this.fecha_final = new Date(params.get('fecha_fin'));
    this.usuario_id = params.get('uid');

    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });
  }

  salir():void {
    this.oauthService.logOut(true);
    window.location.href = this.oauthService.logoutUrl;
    //window.location.reload();
  }

}
