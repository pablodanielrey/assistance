import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  oficinas=[
    {
      'nombre':'DiTeSI',
      'cargo':'E7'
    }
  ]

  justificaciones=[
    {
      'nombre':'Ausente con Aviso',
      'cantidad':'1'
    },
    {
      'nombre':'Boleta de Salida',
      'cantidad':'01:00'
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
