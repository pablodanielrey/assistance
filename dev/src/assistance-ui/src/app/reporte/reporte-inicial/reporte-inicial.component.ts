import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reporte-inicial',
  templateUrl: './reporte-inicial.component.html',
  styleUrls: ['./reporte-inicial.component.css']
})
export class ReporteInicialComponent implements OnInit {
  lugar: string = environment.lugar;

  constructor() { }


  ngOnInit() {
  }

}
