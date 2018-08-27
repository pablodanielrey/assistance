
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';





const ASSISTANCE_API_URL = environment.assistanceApiUrl;


import { Reloj, DatosAsistencia, Perfil, Reporte, ReporteGeneral, DatosHorario, Horario, Justificacion, FechaJustificada, Lugar } from './entities/asistencia';

@Injectable()
export class AssistanceService {

  constructor(private http: HttpClient) { }

  obtenerAccesoModulos(): Observable<string[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/acceso_modulos`;
    return this.http.get<string[]>(apiUrl);
  }

  buscarUsuarios(texto:string): Observable<DatosAsistencia[]> {
    const options = { params: new HttpParams()
              .set('q', texto ? texto : 'algoquenoexiste')
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios`;
    return this.http.get<DatosAsistencia[]>(apiUrl, options)
    //.map(datos => datos.map(d => d));
    /*
    .map(datos => datos; console.log(datos))
    .filter(datos => datos.filter(d => { d.asistencia != null }))
    .map(datos => datos.map(d => new DatosAsistencia(d)));
    */
  }

  buscarLugares(texto:string): Observable<Lugar[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/lugares`;
    if (texto == null) {
      return this.http.get<Lugar[]>(apiUrl);
    } else {
      const options = { params: new HttpParams()
                .set('q', texto ? texto : null)
            };
      return this.http.get<Lugar[]>(apiUrl, options);
    }

  }

  buscarUsuario(uid:string): Observable<DatosAsistencia> {
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}`;
    return this.http.get<DatosAsistencia>(apiUrl).pipe(map(info => new DatosAsistencia(info)));
  }

  buscarUsuariosAsistencia(texto:string): Observable<DatosAsistencia[]> {
    const options = { params: new HttpParams()
              .set('q', texto ? texto : 'algoquenoexiste')
              .set('assistance', 'true')
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios`;
    return this.http.get<DatosAsistencia[]>(apiUrl, options);
                    //.map(datos => datos.filter(d => d.asistencia != null));
  }

  buscarJustificaciones(): Observable<Justificacion[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificaciones`;
    return this.http.get<Justificacion[]>(apiUrl).pipe(map(datos => datos.map(j => new Justificacion(j))));
  }

  obtenerJustificacion(jid:string): Observable<Justificacion> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificaciones/${jid}`;
    return this.http.get<[Justificacion]>(apiUrl).pipe(map(datos => new Justificacion(datos)));
  }

  crearJustificacion(justificacion: Justificacion):Observable<Justificacion> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificaciones`;
    return this.http.put<Justificacion>(apiUrl, justificacion);
  }

  modificarJustificacion(justificacion: Justificacion):Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificaciones/${justificacion.id}`;
    return this.http.post<any>(apiUrl, justificacion);
  }

  eliminarJustificacion(jid:string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificaciones/${jid}`;
    return this.http.delete<any>(apiUrl);
  }

  eliminarFechaJustificada(uid:string, jid:string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/justificaciones/${jid}`;
    return this.http.delete<any>(apiUrl);
  }

  justificar(fj: FechaJustificada):Observable<string> {
    let apiUrl = `${ASSISTANCE_API_URL}/justificar`;
    return this.http.put<string>(apiUrl, fj);
  }

  obtenerUsuario(uid:string): Observable<DatosAsistencia> {
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}`;
    return this.http.get<DatosAsistencia>(apiUrl).pipe(map(datos => new DatosAsistencia(datos)));
  }


  obtenerRelojes(): Observable<Reloj[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes`;
    return this.http.get<[Reloj[]]>(apiUrl).pipe(map(datos => datos.map(d => new Reloj(d))));
  }

  obtenerReloj(rid:string): Observable<Reloj> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}`;
    return this.http.get<[Reloj]>(apiUrl).pipe(map(datos => new Reloj(datos)));
  }

  obtenerUsuariosReloj(rid:string): Observable<any[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}/usuarios`;
    return this.http.get<[Reloj]>(apiUrl);
  }

  obtenerUsuarioReloj(rid:string, ruid:string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}/usuarios/${ruid}`;
    return this.http.get<any>(apiUrl);
  }

  eliminarHuellas(rid:string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}/huellas`;
    return this.http.delete<any>(apiUrl);
  }

  eliminarUsuarios(rid:string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}/usuarios`;
    return this.http.delete<any>(apiUrl);
  }

  sincronizarLogs(rid:string): Observable<HttpResponse<any>> {
    let apiUrl = `${ASSISTANCE_API_URL}/relojes/${rid}/sincronizar`;
    return this.http.get<any>(apiUrl, { observe: 'response' });
  }

  generarReporte(uid: string, fecha_inicio: Date, fecha_fin: Date): Observable<Reporte> {

    const options = { params: new HttpParams()
              .set('inicio', fecha_inicio.toDateString())
              .set('fin', fecha_fin.toDateString())
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/reporte`;
    return this.http.get<[Reporte]>(apiUrl, options).pipe(map(datos => new Reporte(datos)));
  }

  generarReporteGeneral(lugares: Array<string>, fecha: Date): Observable<ReporteGeneral[]> {

    const options = {'lugares': lugares, 'fecha': fecha.toDateString()};
    let apiUrl = `${ASSISTANCE_API_URL}/reportes`;
    return this.http.post<ReporteGeneral[]>(apiUrl, options).pipe(map(datos => datos.map(d => new ReporteGeneral(d))));
  }

  obtenerHorario(uid: string, fecha: Date): Observable<DatosHorario> {

    const options = { params: new HttpParams()
              .set('fecha', fecha.toDateString())
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/horario`;
    return this.http.get<[DatosHorario]>(apiUrl, options).pipe(map(datos => new DatosHorario(datos)));
  }

  crearHorario(horarios: Horario[]):Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/horario`;
    return this.http.put<any>(apiUrl, horarios);

  }

  miPerfil(uid: string, fecha: Date):Observable<any> {
    const options = { params: new HttpParams()
              .set('fecha', fecha.toDateString())
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/perfil`;
    //return this.http.get<any>(apiUrl, options).pipe(map(datos => new Reporte(datos)));
    return this.http.get<Perfil>(apiUrl, options).pipe(map(d => new Perfil(d)));
  }

  obtenerHorariosHistorico(uid: string):Observable<Horario[]> {
    let horarios = []
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    horarios.push(new Horario({'usuario_id': uid, 'fecha_valido': new Date(), 'hora_entrada': 25200, 'hora_salida':50400}))
    return Observable.of(horarios);
  }

}
