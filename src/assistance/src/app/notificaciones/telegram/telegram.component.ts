import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AssistanceService } from '../../assistance.service';


@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.css']
})
export class TelegramComponent implements OnInit {

  codigo: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private service: AssistanceService) { }
  
  ngOnInit() {
    
    /*
    this.route.params.subscribe(p => {
      console.log(p['code']);
      this.codigo = p['code'];
      this.service.activarCuentaTelegram(this.codigo).subscribe(s => {
        console.log('cuenta activada correctamente');
        this.router.navigate(['/']);
      },
      e => {
        console.log(e);
        console.log('error activando cuenta');
        this.router.navigate(['/']);
      });
    });
    */

    
  }

  enviar_codigo() {
    this.service.activarCuentaTelegram(this.codigo).subscribe(s => {
      console.log('cuenta activada correctamente');
      this.router.navigate(['/']);
    },
    e => {
      console.log(e);
      console.log('error activando cuenta');
      this.router.navigate(['/']);
    });
  }

}
