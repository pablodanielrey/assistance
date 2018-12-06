import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AssistanceService } from '../../assistance.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-compensatorios-consulta',
  templateUrl: './compensatorios-consulta.component.html',
  styleUrls: ['./compensatorios-consulta.component.css']
})
export class CompensatoriosConsultaComponent implements OnInit {
  usuario_id: string = null;
  cantidad: number = null;
  subscriptions: any[] = [];

  constructor(public service: AssistanceService,
              public oauthService: OAuthService, 
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    this.usuario_id = params.get('uid');
    this.subscriptions.push(this.service.obtenerCompensatorios(this.usuario_id).subscribe(r => {
      this.cantidad = r.cantidad;
    }));
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
