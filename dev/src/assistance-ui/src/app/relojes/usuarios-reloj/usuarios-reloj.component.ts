import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Usuario } from '../../entities/usuario';
import { AssistanceService } from '../../assistance.service';

@Component({
  selector: 'app-usuarios-reloj',
  templateUrl: './usuarios-reloj.component.html',
  styleUrls: ['./usuarios-reloj.component.css']
})
export class UsuariosRelojComponent implements OnInit {

  rid: string = null;
  usuarios: any[] = [];
  private subscriptions: any[] = [];

  constructor(private service: AssistanceService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
      this.rid = this.route.snapshot.paramMap.get('rid');
      this.buscarUsuariosReloj();
  }

  buscarUsuariosReloj(): void {
    this.usuarios = [];
    this.subscriptions.push(this.service.obtenerUsuariosReloj(this.rid)
      .subscribe(usuarios => {
        console.log(usuarios);
        this.usuarios = usuarios;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

}
