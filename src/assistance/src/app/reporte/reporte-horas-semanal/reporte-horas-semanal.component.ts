import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-horas-semanal',
  templateUrl: './reporte-horas-semanal.component.html',
  styleUrls: ['./reporte-horas-semanal.component.css']
})
export class ReporteHorasSemanalComponent implements OnInit {

  usuario_id: string = null;

  constructor(private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      p => {
        this.usuario_id = p.get('uid');
      }
    )
  }

}
