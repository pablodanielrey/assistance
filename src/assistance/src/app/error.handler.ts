import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
//import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
//import { LoggingService } from '../services';
//import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error) {
      let zone = <NgZone>this.injector.get(NgZone);
      const snack = this.injector.get(MatSnackBar);
      let ref = snack.open(error.message,'Cerrar');
      ref.onAction().subscribe(() => {
        zone.run(() => {
          ref.dismiss();
        });
      });
        /*
        const loggingService = this.injector.get(LoggingService);
        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        // get the stack trace, lets grab the last 10 stacks only
        StackTrace.fromError(error).then(stackframes => {
            const stackString = stackframes
                .splice(0, 20)
                .map(function(sf) {
                    return sf.toString();
                }).join('\n');
            // log on the server
            //loggingService.log({ message, url, stack: stackString });
        });
        */
      //throw error;
  }
}
