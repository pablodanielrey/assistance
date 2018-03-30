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
    // this.fin = new Date(Date.now());
    // this.inicio = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) );
    // console.log('Inicio:' + this.inicio);
    // console.log('Fin:' + this.fin);

    this.route.params.subscribe(params => {
      if (params['q']) {
        this.busqueda = params['q'];
      }
    });
  }

  usuarioSeleccionado(usuario: any): void {
    // this.router.navigate(['reporte', usuario.id, {fecha_inicial:this.inicio, fecha_final:this.fin}]);
    this.router.navigate(['reporte', usuario.id]);
  }

}
