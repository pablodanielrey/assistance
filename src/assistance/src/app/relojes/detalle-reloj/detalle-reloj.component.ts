import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Reloj } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-detalle-reloj',
  templateUrl: './detalle-reloj.component.html',
  styleUrls: ['./detalle-reloj.component.css']
})
export class DetalleRelojComponent implements OnInit {

  reloj: Reloj = null;
  subscriptions: any[] = [];
  eliminar_activo: boolean = false;
  opcions_avanzadas: boolean = false;


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


  activar_eliminar():void {
    this.eliminar_activo = !this.eliminar_activo;
  }

  eliminar_usuarios():void {
    this.subscriptions.push(this.service.eliminarUsuarios(this.reloj.id).subscribe(
      r => console.log(r),
      err => console.log(err)
    ))
  }

  eliminar_huellas():void {
    this.subscriptions.push(this.service.eliminarHuellas(this.reloj.id).subscribe(
      resp => { console.log(resp.headers); console.log(resp.body)},
      err => console.log(err)
    ))
  }

  sincronizar():void {
    this.subscriptions.push(this.service.sincronizarLogs(this.reloj.id).subscribe(
      r => console.log(r),
      err => console.log(err)
    ))
  }
}
