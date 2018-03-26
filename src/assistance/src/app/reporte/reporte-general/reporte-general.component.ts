import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  subscriptions: any[] = [];
  fecha: Date;
  ids: string[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.route
      .queryParams
      .subscribe(params => {
        this.ids = params['ids'] || [];
        this.fecha = params['fecha'] || null;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
