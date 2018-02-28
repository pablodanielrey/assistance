import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import {HttpClient, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

const ASSISTANCE_API_URL = environment.assistanceApiUrl;


import { Reloj } from './entities/asistencia';

@Injectable()
export class AssistanceService {

  constructor(private http: HttpClient) { }

  buscarRelojes(): Observable<Reloj[]> {
    let apiUrl = `${ASSISTANCE_PI_URL}/relojes`;
    return this.http.get<[]>(apiUrl).map(datos => datos.map(d => new Reloj(d)));
  }

}
