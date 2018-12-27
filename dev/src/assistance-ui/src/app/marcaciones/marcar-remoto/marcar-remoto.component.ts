import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AssistanceService } from '../../assistance.service';

interface Back {
  url: string;
  params: any;
}

@Component({
  selector: 'app-marcar-remoto',
  templateUrl: './marcar-remoto.component.html',
  styleUrls: ['./marcar-remoto.component.css']
})
export class MarcarRemotoComponent implements OnInit {


  back: Back;
  usuario: string;
  fecha: Date = new Date();
  responses$: Observable<any[]>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: AssistanceService) { }

  ngOnInit() {
    this.procesarBack();

    this.route.paramMap.subscribe(p => {
      this.usuario = p.get('uid');
      this.responses$ = this.service.obtenerMarcacionesRemotas(this.usuario);
    });
  }

  procesarBack() {
    this.route.queryParamMap.subscribe(p => {
      if (p.has('back')) {
        let sjson = atob(p.get('back'))
        this.back = JSON.parse(sjson);
      }
    });
  }

  volver() {
    console.log(this.back);
    if (this.back.params != null) {
      this.router.navigate([this.back.url], {queryParams:this.back.params});
    }else{
      this.router.navigate([this.back.url]);
    }
  }


  marcar() {
    this.service.marcarRemotoUsuario(this.usuario).subscribe(r => {
      console.log(r);
      this.service.obtenerMarcacionesRemotas(this.usuario).subscribe(ms => {
        console.log(ms);
      })
    });
  }

}
