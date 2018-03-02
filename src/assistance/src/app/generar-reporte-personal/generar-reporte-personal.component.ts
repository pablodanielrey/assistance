import { Component, OnInit } from '@angular/core';
import { SeleccionarUsuarioComponent } from '../seleccionar-usuario/seleccionar-usuario.component';

import { Usuario } from '../entities/usuario';

@Component({
  selector: 'app-generar-reporte-personal',
  templateUrl: './generar-reporte-personal.component.html',
  styleUrls: ['./generar-reporte-personal.component.css']
})
export class GenerarReportePersonalComponent implements OnInit {

  usuario: Usuario = null;

  constructor() { }


  ngOnInit() {
  }

}
