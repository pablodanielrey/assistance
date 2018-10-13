import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
//import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
//import { LoggingService } from '../services';
//import * as StackTrace from 'stacktrace-js';
import { NotificacionesService } from './notificaciones.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
                private notification: NotificacionesService) { }

    handleError(error) {
      console.log(error);
      //this.notification.show('Asistencia', error);
      return;
  }

}
