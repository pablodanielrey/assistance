import { Injectable, Injector, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class NotificacionesService {

  constructor(public snack: MatSnackBar) {

  }


  show(msg:string):void {
    alert(msg);
  }

}
