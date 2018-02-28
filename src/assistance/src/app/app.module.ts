import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { MyMaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AppRoutingModule } from './app-routing.module';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { GenerarReportePersonalComponent } from './generar-reporte-personal/generar-reporte-personal.component';
import { ReporteInicialComponent } from './reporte-inicial/reporte-inicial.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { SeleccionarRelojComponent } from './seleccionar-reloj/seleccionar-reloj.component';



@NgModule({
  declarations: [
    AppComponent,
    ReporteComponent,
    SeleccionarUsuarioComponent,
    GenerarReportePersonalComponent,
    ReporteInicialComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PantallaPrincipalComponent,
    SeleccionarRelojComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyMaterialModule,
    FormsModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
