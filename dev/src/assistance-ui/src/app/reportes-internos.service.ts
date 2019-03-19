import { Injectable } from '@angular/core';

import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { map, switchMap, flatMap, share, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import { Reloj, 
  DatosAsistencia, 
  Perfil, 
  Reporte, ReporteGeneral, 
  DatosHorario, Horario, HistorialHorario, 
  Justificacion, FechaJustificada, 
  Lugar, 
  ReporteJustificaciones,
  DatosCompensatorio,
  Configuracion,
  Compensatorio} from './entities/asistencia';
import { Usuario } from './entities/usuario';

const ASSISTANCE_API_URL = environment.assistanceApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportesInternosService {

  constructor(private http: HttpClient) { }

  ultimasJustificaciones(cantidad: number): Observable<any[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/reporte_justificaciones_realizadas/${cantidad}`;
    return this.http.get<any[]>(apiUrl).pipe(map(datos => datos.map(j => new FechaJustificada(j))));
  }


}
