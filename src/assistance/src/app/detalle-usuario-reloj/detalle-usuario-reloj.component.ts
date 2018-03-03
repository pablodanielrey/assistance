import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AssistanceService } from '../assistance.service';

@Component({
  selector: 'app-detalle-usuario-reloj',
  templateUrl: './detalle-usuario-reloj.component.html',
  styleUrls: ['./detalle-usuario-reloj.component.css']
})
export class DetalleUsuarioRelojComponent implements OnInit {

  datos: any = null;
  subscriptions: any[] = [];

  constructor(private service: AssistanceService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let rid = params.get('rid');
    let ruid = params.get('ruid');
    this.subscriptions.push(this.service.obtenerUsuarioReloj(rid, ruid).subscribe(
      rs => {
        console.log(rs);
        this.datos = rs;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
