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


import { Reloj, DatosAsistencia, Reporte } from './entities/asistencia';

@Injectable()
export class AssistanceService {

  constructor(private http: HttpClient) { }

  buscarUsuarios(texto:string): Observable<DatosAsistencia[]> {
    const options = { params: new HttpParams()
              .set('q', texto ? texto : 'algoquenoexiste')
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios`;
    return this.http.get<DatosAsistencia[]>(apiUrl, options).map(datos => datos.map(d => new DatosAsistencia(d)));
  }


  obtenerRelojes(): Observable<Reloj[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes`;
    return this.http.get<[Reloj[]]>(apiUrl).map(datos => datos.map(d => new Reloj(d)));
  }

  obtenerReloj(rid:string): Observable<Reloj> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}`;
    return this.http.get<[Reloj]>(apiUrl).map(datos => new Reloj(datos));
  }

  generarReporte(uid: string, fecha_inicio: Date, fecha_fin: Date): Observable<Reporte> {

    const options = { params: new HttpParams()
              .set('inicio', fecha_inicio.toDateString())
              .set('fin', fecha_fin.toDateString())
          };
    console.log(options);
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/reporte/`;
    return this.http.get<[Reporte]>(apiUrl, options).map(datos => new Reporte(datos));
  }



}
