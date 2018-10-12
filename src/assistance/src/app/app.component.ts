import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';

import { UpdateService } from './update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menu_abierto: boolean = false;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private update: UpdateService) {
  }

  ngOnInit() {
    Notification.requestPermission().then(() => { new Notification('Notificaciones Activadas') });
    this.update.checkForUpdate();
  }

  onMenu(abierto: boolean):void {
    this.menu_abierto = !this.menu_abierto;
  }

  onOpenedChange(abierto: boolean): void {
    this.menu_abierto = abierto;
  }

  onItem(v:boolean):void {
    this.menu_abierto = v;
  }

}
