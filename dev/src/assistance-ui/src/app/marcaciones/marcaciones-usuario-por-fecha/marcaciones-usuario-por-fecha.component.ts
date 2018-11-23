import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';

import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-marcaciones-usuario-por-fecha',
  templateUrl: './marcaciones-usuario-por-fecha.component.html',
  styleUrls: ['./marcaciones-usuario-por-fecha.component.css']
})
export class MarcacionesUsuarioPorFechaComponent implements OnInit {

  columnas: string[] = ['fullname','dni','tipo_designacion','cargo','desde','hasta','lugar','estado'];
  subscriptions: any[] = [];


  constructor(private route : ActivatedRoute,
              private service : AssistanceService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let uid = p.get('uid');
      let fecha = p.get('fecha')
      // se llama al service
    });    
  }

}
