import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-justificacion-personal',
  templateUrl: './justificacion-personal.component.html',
  styleUrls: ['./justificacion-personal.component.css']
})
export class JustificacionPersonalComponent implements OnInit {

  info: any;
  fecha: Date;
  usuario_id: string;


  constructor(private oauthService: OAuthService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let paramsQ = this.route.snapshot.queryParamMap;

    this.usuario_id = params.get('uid');

    this.fecha = new Date(paramsQ.get('fecha'));

    this.oauthService.loadUserProfile().then(r => {
      console.log(r);
      this.info = r;
    });


  }

}
