import { Component, OnInit } from '@angular/core';

import { Reloj } from '../../entities/asistencia';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-seleccionar-reloj',
  templateUrl: './seleccionar-reloj.component.html',
  styleUrls: ['./seleccionar-reloj.component.css']
})
export class SeleccionarRelojComponent implements OnInit {

  relojes: Reloj[] = [];
  constructor(public service: AssistanceService) { }

  ngOnInit() {
    this.service.obtenerRelojes().subscribe(rs =>
      {
        console.log(rs);
        this.relojes = rs;
      });
  }

}
