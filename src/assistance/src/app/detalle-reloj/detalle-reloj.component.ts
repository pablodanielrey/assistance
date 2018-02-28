import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Reloj } from '../entities/asistencia';
import { AssistanceService } from '../assistance.service';

@Component({
  selector: 'app-detalle-reloj',
  templateUrl: './detalle-reloj.component.html',
  styleUrls: ['./detalle-reloj.component.css']
})
export class DetalleRelojComponent implements OnInit {

  reloj: Reloj = null;
  subscriptions: any[] = [];

  constructor(private service: AssistanceService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    let rid = this.route.snapshot.paramMap.get('rid');
    this.subscriptions.push(this.service.obtenerReloj(rid).subscribe(
      rs => {
        console.log(rs);
        this.reloj = rs;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
