import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-justificaciones',
  templateUrl: './reporte-justificaciones.component.html',
  styleUrls: ['./reporte-justificaciones.component.css']
})
export class ReporteJustificacionesComponent implements OnInit {

  usuario_id: string = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      p => {
        this.usuario_id = p.get('uid');
      }
    )    
  }

}
