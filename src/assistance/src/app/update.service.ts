import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private update: SwUpdate, private notification: NotificacionesService) { 
    this.update.available.subscribe(event => {
      this.notification.show('Asistencia', 'Actualizando');
      this.update.activateUpdate().then(() => document.location.reload());
    });
  }

  checkForUpdate() {
    this.notification.show('Asistencia', 'Chequeando actualizaciones');
    this.update.checkForUpdate().then(() => {
      this.notification.show('Asistencia', 'Nueva versión existente');
    });
  }

}
