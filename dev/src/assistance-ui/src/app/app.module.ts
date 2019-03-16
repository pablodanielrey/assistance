import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error.handler';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule, OAuthStorage, OAuthResourceServerErrorHandler } from 'angular-oauth2-oidc';
import { OidpGuard } from './oauth2/oidp.guard';
import { Oauth2Component } from './oauth2/oauth2.component';
import { Oauth2Service } from './oauth2/oauth2.service';
import { OauthErrorHandler } from './oauth2/oauth-error.service';

import { PermisosService } from './permisos.service';

import { MyMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFilterPipe } from './search-filter.pipe';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';


import { AssistanceService } from './assistance.service';
import { NotificacionesService } from './notificaciones.service';
import { GaleriaComponent } from './galeria/galeria.component';
import { SeleccionarRelojComponent } from './relojes/seleccionar-reloj/seleccionar-reloj.component';
import { UsuariosRelojComponent } from './relojes/usuarios-reloj/usuarios-reloj.component';
import { DetalleUsuarioRelojComponent } from './relojes/detalle-usuario-reloj/detalle-usuario-reloj.component';
import { DetalleRelojComponent } from './relojes/detalle-reloj/detalle-reloj.component';

import { ReporteComponent } from './reporte/reporte/reporte.component';
import { ReporteInicialComponent } from './reporte/reporte-inicial/reporte-inicial.component';
import { GenerarReportePersonalComponent } from './reporte/generar-reporte-personal/generar-reporte-personal.component';

import { HorarioInicialComponent } from './horario/horario-inicial/horario-inicial.component';
import { HorarioDetalleComponent } from './horario/horario-detalle/horario-detalle.component';
import { HorarioModificarComponent } from './horario/horario-modificar/horario-modificar.component';
import { HorarioHistoricoComponent } from './horario/horario-historico/horario-historico.component';

import { ToogleFullscreenDirective } from './toogle-fullscreen.directive';

import { JustificacionInicialComponent } from './justificacion/justificacion-inicial/justificacion-inicial.component';
import { JustificacionAdminComponent } from './justificacion/justificacion-admin/justificacion-admin.component';
import { JustificacionModificarComponent } from './justificacion/justificacion-modificar/justificacion-modificar.component';
import { JustificacionPersonalInicioComponent } from './justificacion/justificacion-personal-inicio/justificacion-personal-inicio.component';
import { JustificacionPersonalComponent } from './justificacion/justificacion-personal/justificacion-personal.component';


import { SeleccionarJustificacionComponent } from './seleccionar-justificacion/seleccionar-justificacion.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { JustificacionGeneralComponent } from './justificacion/justificacion-general/justificacion-general.component';
import { DialogoEliminarFechaJustificadaComponent } from './reporte/dialogo-eliminar-fecha-justificada/dialogo-eliminar-fecha-justificada.component';
import { ReporteGeneralInicialComponent } from './reporte/reporte-general-inicial/reporte-general-inicial.component';
import { ListadoLugaresComponent } from './listado-lugares/listado-lugares.component';
import { ReporteGeneralComponent } from './reporte/reporte-general/reporte-general.component';

import { DialogoEliminarJustificacionComponent } from './justificacion/dialogo-eliminar-justificacion/dialogo-eliminar-justificacion.component';
import { LoaderComponent } from './loader/loader.component';
import { SistemaComponent } from './sistema/sistema.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { TelegramComponent } from './notificaciones/telegram/telegram.component';
import { ErrorComponent } from './error/error.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReporteHorasSemanalComponent } from './reporte/reporte-horas-semanal/reporte-horas-semanal.component';
import { ReporteJustificacionesComponent } from './reporte/reporte-justificaciones/reporte-justificaciones.component';
import { SeleccionarUsuarioJustificacionesComponent } from './reporte/reporte-justificaciones/seleccionar-usuario-justificaciones/seleccionar-usuario-justificaciones.component';

import { UpdateService } from './update.service';
import { MarcacionesUsuarioPorFechaComponent } from './marcaciones/marcaciones-usuario-por-fecha/marcaciones-usuario-por-fecha.component';
import { CompensatoriosInicialComponent } from './compensatorios/compensatorios-inicial/compensatorios-inicial.component';
import { CompensatoriosModificarComponent } from './compensatorios/compensatorios-modificar/compensatorios-modificar.component';
import { CompensatoriosConsultaComponent } from './compensatorios/compensatorios-consulta/compensatorios-consulta.component';
import { CompensatoriosAltaComponent } from './compensatorios/compensatorios-alta/compensatorios-alta.component';
import { MarcarRemotoComponent } from './marcaciones/marcar-remoto/marcar-remoto.component';


export function windowFactory() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    ReporteComponent,
    SeleccionarUsuarioComponent,
    GenerarReportePersonalComponent,
    ReporteInicialComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PantallaPrincipalComponent,
    SeleccionarRelojComponent,
    DetalleRelojComponent,
    GaleriaComponent,
    UsuariosRelojComponent,
    DetalleUsuarioRelojComponent,
    JustificacionPersonalComponent,
    HorarioInicialComponent,
    HorarioDetalleComponent,
    HorarioModificarComponent,
    ToogleFullscreenDirective,
    JustificacionInicialComponent,
    JustificacionAdminComponent,
    SeleccionarJustificacionComponent,
    JustificacionModificarComponent,
    JustificacionPersonalInicioComponent,
    ListadoUsuariosComponent,
    JustificacionGeneralComponent,
    DialogoEliminarFechaJustificadaComponent,
    ReporteGeneralInicialComponent,
    ListadoLugaresComponent,
    ReporteGeneralComponent,
    DialogoEliminarJustificacionComponent,
    LoaderComponent,
    SistemaComponent,
    MiperfilComponent,
    HorarioHistoricoComponent,
    TelegramComponent,
    Oauth2Component,
    ErrorComponent,
    ReporteHorasSemanalComponent,
    ReporteJustificacionesComponent,
    SeleccionarUsuarioJustificacionesComponent,
    MarcacionesUsuarioPorFechaComponent,
    CompensatoriosInicialComponent,
    CompensatoriosModificarComponent,
    CompensatoriosConsultaComponent,
    CompensatoriosAltaComponent,
    MarcarRemotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyMaterialModule,
    FormsModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http'],
        sendAccessToken: true
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [DialogoEliminarFechaJustificadaComponent, DialogoEliminarJustificacionComponent],
  providers: [
      UpdateService,
      AssistanceService,
      PermisosService,
      NotificacionesService,
      { provide: 'window', useFactory: windowFactory },
      { provide: LOCALE_ID, useValue: "es" },
      { provide: ErrorHandler, useClass: GlobalErrorHandler },
      OidpGuard,
      { provide: OAuthStorage, useValue: localStorage },
      { provide: OAuthResourceServerErrorHandler, useClass: OauthErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
