import { Component, OnInit } from '@angular/core';
import { PermisosService } from 'src/app/permisos.service';

@Component({
  selector: 'app-menu-reportes-internos',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  permisos: PermisosService;

  constructor(permisos:PermisosService) { 
    this.permisos = permisos;
  }

  ngOnInit() {
  }

}
