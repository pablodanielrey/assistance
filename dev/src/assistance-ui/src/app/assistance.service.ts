import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { map, switchMap, flatMap, share, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';


const ASSISTANCE_API_URL = environment.assistanceApiUrl;

import { Reloj, 
         DatosAsistencia, 
         Perfil, 
         Reporte, ReporteGeneral, 
         DatosHorario, Horario, HistorialHorario, 
         Justificacion, FechaJustificada, 
         Lugar, 
         ReporteJustificaciones,
         DatosCompensatorio,
         Configuracion} from './entities/asistencia';

import { TelegramToken } from './entities/telegram';

@Injectable()
export class AssistanceService {

  modulos: string[] = null;

  constructor(private http: HttpClient) { 
    let s = this.obtenerAccesoModulos().subscribe(m => { this.modulos = m; s.unsubscribe(); });
  }

  obtenerAccesoModulos(): Observable<string[]> {
    let apiUrl = `${ASSISTANCE_API_URL}/acceso_modulos`;
    let o = this.http.get<string[]>(apiUrl);
    return o.pipe(tap(m => this.modulos = m));
  }

  obtenerTelegramToken(): Observable<TelegramToken> {
    let apiUrl = `${ASSISTANCE_API_URL}/telegram_token`;
    return this.http.get<TelegramToken>(apiUrl).pipe(map(t => new TelegramToken(t)));
  }

  activarCuentaTelegram(code): Observable<string> {
    let apiUrl = `${ASSISTANCE_API_URL}/telegram_activate/` + code;
    return this.http.get<string>(apiUrl);
  }

  chequearPerfil(profiles: string[]): Observable<boolean> {
    if (this.modulos == null) {
      return of(false);
    }
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        r = true;
      }
    });
    return of(r);
  }

    //   } else {
    //     this.obtenerAccesoModulos().pipe(share()).pipe(switchMap(
    //       (m) => {
    //         this.modulos = m;
    //         return this.chequearPerfil(profiles);
    //       }
    //     )).subscribe(b => {
    //       obs.next(b);
    //       obs.complete();
    //     });
    //   }
    // });
    // return o.pipe(share());


    // let r = false;
    // if (this.modulos != null) {
    // }
    // return r;
  


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

  obtenerCompensatorios(uid: string): Observable<DatosCompensatorio> {
    //Observable de prueba
    let result = [  
                    {
                      usuario: {
                        id: '1',
                        nombre: 'Miguel',
                        apellido: 'Macagno',
                        dni: '34928857'
                      },
                      cantidad: 2,
                      compensatorios: [
                        {registro_id: '1',
                        fecha: '2018-05-04',
                        notas: 'Por venir a trabajar en feriado',
                        autorizador_id: '1234-65465-789',
                        cantidad: 2,
                        cuenta_id: '23131332',
                        asiento_id: '2564879642'},
                        {registro_id: '2',
                        fecha: '2018-08-07',
                        notas: 'Por computo de horas extra',
                        autorizador_id: '1234-65465-789',
                        cantidad: 23,
                        cuenta_id: '23131332',
                        asiento_id: '2564879642'},
                        {registro_id: '3',
                        fecha: '2018-09-04',
                        notas: 'Por venir a trabajar en feriado',
                        autorizador_id: '1234-65465-789',
                        cantidad: 1,
                        cuenta_id: '23131332',
                        asiento_id: '2564879642'},
                        {registro_id: '4',
                        fecha: '2018-10-04',
                        notas: 'Por que si',
                        autorizador_id: '1234-65465-789',
                        cantidad: 7,
                        cuenta_id: '23131332',
                        asiento_id: '2564879642'}
                      ]
                    }                    
                  ]
  
    return from(result).pipe(map(datos => new DatosCompensatorio(datos)));
  }

  //generarReporteJustificaciones(uid: string, fecha_inicio: Date, fecha_fin: Date): Observable<ReporteJustificaciones> {
  //  let result = [  
  //                  {
  //                    usuario: {
  //                      id: '1',
  //                      nombre: 'Miguel',
  //                      apellido: 'Macagno',
  //                      dni: '34928857'
  //                    },
  //                    fecha_inicial: '2018-01-01 00:00',
  //                    fecha_final: '2018-02-01 00:00',
  //                    justificaciones: [
  //                      {id: '1',
  //                      nombre: 'Ausente con Aviso',
  //                      cantidad: 5 },
  //                      {id: '2',
  //                      nombre: 'Vacaciones',
  //                      cantidad: 25 },
  //                      {id: '3',
  //                      nombre: 'WallyJustifications',
  //                      cantidad: 15 },
  //                      {id: '4',
  //                      nombre: 'Ivanejadas',
  //                      cantidad: 6 },
  //                      {id: '5',
  //                      nombre: 'Secretaria de Trabajos 3ros',
  //                      cantidad: 3 },
  //                    ]
  //                  }                    
  //                ]
  //  return from(result).pipe(map(datos => new ReporteJustificaciones(datos)));
  //} Ejemplo de Observable de prueba sin necesidad de crear una api.
  
  generarReporteJustificaciones(uid: string, fecha_inicio: Date, fecha_fin: Date): Observable<ReporteJustificaciones> {
    const options = { params: new HttpParams()
      .set('inicio', fecha_inicio.toDateString())
      .set('fin', fecha_fin.toDateString())
    };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/justificaciones`;
    return this.http.get<[ReporteJustificaciones]>(apiUrl, options).pipe(map(datos => new ReporteJustificaciones(datos)));
  }

  obtenerConfiguracion(): Observable<Configuracion> {
    let apiUrl = `${ASSISTANCE_API_URL}/obtener_config`;
    return this.http.get<[Configuracion]>(apiUrl).pipe(map(datos => new Configuracion(datos)));
  }

  obtenerHorario(uid: string, fecha: Date): Observable<DatosHorario> {

    const options = { params: new HttpParams()
              .set('fecha', fecha.toDateString())
          };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/horario`;
    return this.http.get<[DatosHorario]>(apiUrl, options).pipe(map(datos => new DatosHorario(datos)));
  }

  eliminarHorario(uid: string, hid: string): Observable<any> {
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/horario/${hid}`;
    return this.http.delete<any>(apiUrl);
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

  obtenerHorariosHistorico(uid: string):Observable<HistorialHorario> {
    let fecha = new Date();
    const options = { params: new HttpParams()
//      .set('fecha_inicio', fecha.toDateString())
//      .set('fecha_fin', fecha.toDateString())
    };
    let apiUrl = `${ASSISTANCE_API_URL}/usuarios/${uid}/historial_horarios`;
    //return this.http.get<any>(apiUrl, options).pipe(map(datos => new Reporte(datos)));
    return this.http.get<HistorialHorario>(apiUrl, options).pipe(map(d => new HistorialHorario(d)));    
  }

}
