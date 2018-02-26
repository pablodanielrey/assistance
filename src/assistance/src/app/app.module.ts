import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AppRoutingModule } from './app-routing.module';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { GenerarReportePersonalComponent } from './generar-reporte-personal/generar-reporte-personal.component';
import { ReporteInicialComponent } from './reporte-inicial/reporte-inicial.component';


@NgModule({
  declarations: [
    AppComponent,
    ReporteComponent,
    SeleccionarUsuarioComponent,
    GenerarReportePersonalComponent,
    ReporteInicialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
