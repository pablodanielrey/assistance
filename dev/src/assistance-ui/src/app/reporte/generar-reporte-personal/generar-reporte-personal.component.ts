import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../entities/usuario';

@Component({
  selector: 'app-generar-reporte-personal',
  templateUrl: './generar-reporte-personal.component.html',
  styleUrls: ['./generar-reporte-personal.component.css']
})
export class GenerarReportePersonalComponent implements OnInit {

  // inicio: Date;
  // fin: Date;
  busqueda: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['q']) {
        this.busqueda = params['q'];
      }
    });
  }

  usuarioSeleccionado(usuario: Usuario): void {
    console.log(usuario);
    // this.router.navigate(['reporte', usuario.id, {fecha_inicial:this.inicio.toISOString(), fecha_final:this.fin.toISOString()}]);
    this.router.navigate(['/sistema/reportes/personal', usuario.id]);
  }

}
