import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Compensatorio, DatosCompensatorio} from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';
@Component({
  selector: 'app-compensatorios-alta',
  templateUrl: './compensatorios-alta.component.html',
  styleUrls: ['./compensatorios-alta.component.css']
})
export class CompensatoriosAltaComponent implements OnInit {
  usuario_id: string;
  cargando: boolean = false;
  info: DatosCompensatorio = new DatosCompensatorio({});
  subscriptions: any[] = [];
  alta: Compensatorio =new Compensatorio({});

  constructor(private service: AssistanceService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargando = true;
    this.route.params.subscribe(params => {
      console.log('parametros cambiaron');
      console.log(params);
      this.usuario_id = params['uid'];
      this.subscriptions.push(this.service.obtenerCompensatorios(this.usuario_id).subscribe(r => {
        this.cargando = false;
        this.info = r;
      }));
    });    
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  volver() {
    this.location.back();
  }

  crearCompensatorio(): void {
    if (this.alta.cantidad > 0 && this.alta.notas != '') {
      this.alta.usuario_id = this.usuario_id;
      this.alta.fecha = new Date(Date.now());
      this.service.crearCompensatorio(this.alta).subscribe(res => {
      console.log("Se agregaron " + this.alta.cantidad + " compensatorios a " + this.info.usuario.nombre + " " + this.info.usuario.apellido);
      this.volver();
    })}
    else {
      console.log('Falta completar datos')
    }
  }

}
