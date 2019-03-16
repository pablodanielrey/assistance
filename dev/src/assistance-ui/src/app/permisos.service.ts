import { Injectable } from '@angular/core';

import { AssistanceService } from './assistance.service';
import { Oauth2Service } from './oauth2/oauth2.service';



@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  
  modulos: string[] = [];

  constructor(private Oauth2Service: Oauth2Service,
              private service: AssistanceService) { 

    let s = service.obtenerAccesoModulos().subscribe(modulos => {
      this.modulos = modulos;
      s.unsubscribe();
    });

  }

  chequearPerfil(profiles: string[]): boolean {
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)) {
        r = true; 
      }
    });
    return r
  }

  accesoARemoverJustificaciones(usuario_id: string): boolean {
    if (this.chequearPerfil(['super-admin'])) {
      return true;
    }
    let uid = this.Oauth2Service.getId();
    if (uid == usuario_id) {
      return false;
    }
    return this.chequearPerfil(['justificacion_personal_abm','justificacion_general_abm']);
  }

  accesoAJustificaciones(usuario_id: string): boolean {
    if (this.chequearPerfil(['super-admin'])) {
      return true;
    }
    let uid = this.Oauth2Service.getId();
    if (uid == usuario_id) {
      return false;
    }
    return this.chequearPerfil(['justificacion_personal_abm','justificacion_general_abm']);
  }

  accesoAJustificacionesGenerales(usuario_id: string): boolean {
    return false;
  }

}