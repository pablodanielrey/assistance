import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error.handler';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

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

import { ToogleFullscreenDirective } from './toogle-fullscreen.directive';

import { JustificacionInicialComponent } from './justificacion/justificacion-inicial/justificacion-inicial.component';
import { JustificacionAdminComponent } from './justificacion/justificacion-admin/justificacion-admin.component';
import { JustificacionModificarComponent } from './justificacion/justificacion-modificar/justificacion-modificar.component';
import { JustificacionPersonalInicioComponent } from './justificacion/justificacion-personal-inicio/justificacion-personal-inicio.component';
import { JustificacionPersonalComponent } from './justificacion/justificacion-personal/justificacion-personal.component';


import { SeleccionarJustificacionComponent } from './seleccionar-justificacion/seleccionar-justificacion.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { JustificacionGeneralComponent } from './justificacion/justificacion-general/justificacion-general.component';


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
    JustificacionGeneralComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyMaterialModule,
    FormsModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
      AssistanceService,
      { provide: LOCALE_ID, useValue: "en" },
      { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
