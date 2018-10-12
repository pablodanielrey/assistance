import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private update: SwUpdate, private push: SwPush) { 
    this.update.available.subscribe(event => {
      new Notification('Actualizando Aplicación');
      this.update.activateUpdate().then(() => document.location.reload());
    });
  }

  checkForUpdate() {
    this.update.checkForUpdate().then(() => {
      new Notification('Chequeando por actualizaciones');
    });
  }

}
