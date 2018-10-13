import { Injectable, Injector, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class NotificacionesService {

  notifications_api: boolean = false;

  constructor(private injector: Injector) {
    this.inicializar_notifications_api();
  }

  inicializar_notifications_api() {
    Notification.requestPermission().then(
      (r) => {
        this.notifications_api = true;
        let n = new Notification('Notificaciones Activadas');
      }
    );
  }

  show(title:string, msg?:string):void {
    if (this.notifications_api) {
      // uso la api de notificaciones
      let options = {
        body: msg,
        icon: '/assets/icons/icon-72x72.png'
      }
      let n = new Notification(title, options);

    } else {
      // uso el snackbar
      let zone = <NgZone>this.injector.get(NgZone);
      const snack = this.injector.get(MatSnackBar);
      let ref = snack.open(msg,'Cerrar');
      ref.onAction().subscribe(() => {
        zone.run(() => {
          ref.dismiss();
        });
      });    
    }
  }

}
