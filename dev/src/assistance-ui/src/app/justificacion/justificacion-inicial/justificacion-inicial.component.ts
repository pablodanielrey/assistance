import { Component, OnInit } from '@angular/core';

import { PermisosService } from '../../permisos.service';

@Component({
  selector: 'app-justificacion-inicial',
  templateUrl: './justificacion-inicial.component.html',
  styleUrls: ['./justificacion-inicial.component.css']
})
export class JustificacionInicialComponent implements OnInit {

  constructor(private permisos: PermisosService) { }

  ngOnInit() {
    
  }

}
