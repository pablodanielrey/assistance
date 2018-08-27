import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OidpGuard } from './oidp.guard';


import { LoaderComponent } from './loader/loader.component';

import { SistemaComponent } from './sistema/sistema.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { GaleriaComponent } from './galeria/galeria.component';

import { SeleccionarRelojComponent } from './relojes/seleccionar-reloj/seleccionar-reloj.component';
import { DetalleRelojComponent } from './relojes/detalle-reloj/detalle-reloj.component';
import { UsuariosRelojComponent } from './relojes/usuarios-reloj/usuarios-reloj.component';
import { DetalleUsuarioRelojComponent } from './relojes/detalle-usuario-reloj/detalle-usuario-reloj.component';

import { ReporteInicialComponent } from './reporte/reporte-inicial/reporte-inicial.component';
import { GenerarReportePersonalComponent } from './reporte/generar-reporte-personal/generar-reporte-personal.component';
import { ReporteComponent } from './reporte/reporte/reporte.component';
import { ReporteGeneralInicialComponent } from './reporte/reporte-general-inicial/reporte-general-inicial.component';
import { ReporteGeneralComponent } from './reporte/reporte-general/reporte-general.component';

import { JustificacionInicialComponent } from './justificacion/justificacion-inicial/justificacion-inicial.component';
import { JustificacionAdminComponent } from './justificacion/justificacion-admin/justificacion-admin.component';
import { JustificacionModificarComponent } from './justificacion/justificacion-modificar/justificacion-modificar.component';
import { JustificacionPersonalInicioComponent } from './justificacion/justificacion-personal-inicio/justificacion-personal-inicio.component';
import { JustificacionPersonalComponent } from './justificacion/justificacion-personal/justificacion-personal.component';
import { JustificacionGeneralComponent } from './justificacion/justificacion-general/justificacion-general.component';


import { HorarioInicialComponent } from './horario/horario-inicial/horario-inicial.component';
import { HorarioDetalleComponent } from './horario/horario-detalle/horario-detalle.component';
import { HorarioModificarComponent } from './horario/horario-modificar/horario-modificar.component';
import { HorarioHistoricoComponent } from './horario/horario-historico/horario-historico.component';

import { MiperfilComponent } from './miperfil/miperfil.component';


const routes: Routes = [

  { path: 'loader', component: LoaderComponent },
  {
    path: 'sistema',
    component: SistemaComponent,
    canActivate: [OidpGuard],
    children: [
      //{ path: 'inicial', outlet:"pantalla", component: PantallaPrincipalComponent },
      { path: 'inicial', component: PantallaPrincipalComponent },
      { path: 'miperfil', component: MiperfilComponent },
      {
        path: 'reportes',
        children: [
          { path: 'inicial', component: ReporteInicialComponent},
          { path: 'general',
            children: [
              { path: 'seleccion', component: ReporteGeneralInicialComponent },
              { path: 'generar/:fecha', component: ReporteGeneralComponent }
            ]
          },
          { path: 'personal', component: GenerarReportePersonalComponent, canActivate: [OidpGuard] },
          { path: 'personal/:uid', component: ReporteComponent, canActivate: [OidpGuard] }

        ]
      },
      {
        path: 'justificaciones',
        children: [
          { path: 'seleccion', component: JustificacionInicialComponent },
          { path: 'personal', component: JustificacionPersonalInicioComponent },
          { path: 'personal/:uid', component: JustificacionPersonalComponent },
          { path: 'general', component: JustificacionGeneralComponent },
          {
            path: 'admin',
            children: [
              { path: 'seleccion', component: JustificacionAdminComponent },
              { path: 'crear', component: JustificacionModificarComponent },
              { path: 'modificar/:jid', component: JustificacionModificarComponent },
            ]
          }
        ]
      },
      {
        path: 'horarios',
        children: [
            { path: 'seleccion', component: HorarioInicialComponent },
            { path: 'detalle/:uid', component: HorarioDetalleComponent },
            { path: 'modificar/:uid', component: HorarioModificarComponent },
            { path: 'historico/:uid', component: HorarioHistoricoComponent }
        ]
      },
      {
        path: 'relojes',
        children: [
          { path: 'seleccion', component: SeleccionarRelojComponent },
          { path: 'reloj/:rid/detalle', component: DetalleRelojComponent },
          { path: 'reloj/:rid/usuarios', component: UsuariosRelojComponent },
          { path: 'reloj/:rid/usuarios/:ruid', component: DetalleUsuarioRelojComponent }
        ]
      },
    ]
  },
  { path: '**', redirectTo: '/sistema/inicial', pathMatch: 'full' }

  // ,
  // { path: 'justificacion_personal', component: JustificacionPersonalInicioComponent, canActivate: [OidpGuard]},
  // { path: 'justificacion_personal/:uid', component: JustificacionPersonalComponent, canActivate: [OidpGuard] },
  // { path: 'justificacion_admin', component: JustificacionAdminComponent, canActivate: [OidpGuard] },
  // { path: 'crear_justificacion', component: JustificacionModificarComponent, canActivate: [OidpGuard]},
  // { path: 'modificar_justificacion/:jid', component: JustificacionModificarComponent, canActivate: [OidpGuard]},
  // {
  //   path: 'justificaciones2',
  //   canActivate: [OidpGuard],
  //   children: [
  //     { path:'general', component: JustificacionGeneralComponent }
  //   ]
  // },

  // { path: 'horarios', component: HorarioInicialComponent, canActivate: [OidpGuard] },
  // { path: 'horario_detalle/:uid', component: HorarioDetalleComponent, canActivate: [OidpGuard] },
  // { path: 'horario_modificar/:uid', component: HorarioModificarComponent, canActivate: [OidpGuard] },




  // { path: '', redirectTo: 'loader', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
