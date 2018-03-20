import { Injectable } from '@angular/core';

@Injectable()
export class NotificacionesService {

  constructor() {
    if (window.webkitNotifications) {
      console.log("Notifications are supported!");
    }
    else {
      console.log("Notifications are not supported for this Browser/OS version yet.");
    }
  }


}
