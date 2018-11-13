import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../../entities/usuario';

@Component({
  selector: 'app-seleccionar-usuario-justificaciones',
  templateUrl: './seleccionar-usuario-justificaciones.component.html',
  styleUrls: ['./seleccionar-usuario-justificaciones.component.css']
})
export class SeleccionarUsuarioJustificacionesComponent implements OnInit {
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
    this.router.navigate(['/sistema/justificaiones', usuario.id]);
  }

}
