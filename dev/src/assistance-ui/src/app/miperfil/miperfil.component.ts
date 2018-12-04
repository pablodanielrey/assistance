import { Component, OnInit } from '@angular/core';


import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistanceService } from '../assistance.service';

import { Usuario } from '../entities/usuario';
import { Perfil } from '../entities/asistencia';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  fecha: Date = new Date();
  usuario: Usuario;
  info: any;
  subscriptions: any[] = [];
  cargando: boolean = false;
  
  perfil: Perfil;

  interval = null;
  segundos_trabajando: number = -1;
  fecha_trabajando: string = "";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private oauthService: OAuthService,
              private service: AssistanceService) {

              }

  ngOnInit() {
    //this.info = this.oauthService.getIdentityClaims();    
    this.cargando = false;
    // TODO: consultar la entidad usuario correcta.
    //this.usuario = new Usuario(
    //  {
    //    id: this.info.sub,
    //    nombre: this.info.name
    //  }
    //);
    this.route.params.subscribe(params => {
      console.log(params);
      this.usuario = new Usuario(
        {
          id: params['uid']
        }
      )
      if (params['fecha']) {
        this.fecha = new Date(params['fecha']);
        this._actualizarPerfil();
      } else {
         this.fecha = new Date(Date.now());
         this.actualizarPerfil(null);
      }
    });
  }


  actualizarPerfil(event):void {
    this.router.navigate(['/sistema/miperfil/'+this.usuario.id, {fecha:this.fecha.toISOString()}]);
  }

  _actualizarPerfil() {
    this.cargando = true;
    this.subscriptions.push(this.service.miPerfil(this.usuario.id, this.fecha)
    .subscribe(r => {
      this.perfil = r;
      this.usuario = this.perfil.usuario;
      this.cargando = false;
    }));
  }

  _obtener_horario(d:Date) {
    if (d) {
      return this.perfil._fecha_a_hora(d);
    } else {
      return " - ";
    }
  }


  trabajando() {
    /*
      retorna true en el caso de detectar que se está trabajando. y setea el timer adecuado

      vi un muy buen ejemplo en stackoverflow.
      app.filter('secondsToDateTime', function() {
        return function(seconds) {
          var d = new Date(0,0,0,0,0,0,0);
          d.setSeconds(seconds);
          return d;
        };
      });

      para tenerlo en cuenta para definir filtros de este tipo y mostrar usando:

      <b>{{seconds | secondsToDateTime | date:'HH:mm:ss'}}</b>

    */
    let r = this.perfil.segundos_trabajados == 0 && this.perfil.entrada != null;
    if (r && this.interval == null) {
      this.interval = setInterval(() => {
        let entrada = this.perfil.entrada.getTime();
        let ahora = new Date().getTime();
        let trabajado = new Date(0,0,0,0,0,0,0);
        trabajado.setMilliseconds(ahora - entrada);
        this.fecha_trabajando = trabajado.toTimeString().substring(0,8);
      },1000);
    }
    if (!r && this.interval != null) {
      clearInterval(this.interval);
      this.interval = null;
      this.segundos_trabajando = -1;
    }
    return r;
  }


  obtener_hora_entrada() {
    return this._obtener_horario(this.perfil.entrada);
  }

  obtener_hora_salida() {
    return this._obtener_horario(this.perfil.salida);
  }

   obtener_horas_trabajadas() {
    if (this.perfil.segundos_trabajados && this.perfil.segundos_trabajados > 0) {
      return this.perfil.horas_trabajadas();
    } else {
      return " - ";
    }
  }

  obtener_horario_entrada() {
    return this._obtener_horario(this.perfil.hora_entrada);
  }

  obtener_horario_salida() {
    return this._obtener_horario(this.perfil.hora_salida);
  }

  obtener_horario_horas() {
    if (this.perfil.horario_segundos && this.perfil.horario_segundos > 0) {
      return this.perfil._segundos_a_hora(this.perfil.horario_segundos);
    } else {
      return " - ";
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }



  obtener_fecha_final() {
    return this.fecha.toISOString();
  }

  obtener_fecha_inicial() {
    let data = (new Date(this.fecha.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString());
    return data;
  }

  generar_back() {
    return btoa('/sistema/miperfil/' + this.usuario.id);
  }

  generar_query_params() {
    return {
      fecha_inicial:this.obtener_fecha_inicial(),
      fecha_final:this.obtener_fecha_final(),
      back: this.generar_back()
    }
  }

  ver_reporte() {
    this.router.navigate(['/sistema/reportes/personal/' + this.usuario.id,
      {
        fecha_inicial:this.obtener_fecha_inicial(),
        fecha_final:this.obtener_fecha_final(),
        back: '/sistema/miperfil'
      }
    ]);
  }

}
