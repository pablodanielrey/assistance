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

const routes: Routes = [

  {
    path: 'sistema',
    component: SistemaComponent,
    children: [
      { path: 'inicial', outlet:"pantalla", component: PantallaPrincipalComponent }
    ]
  },

  // { path: 'reporte_inicial', component: ReporteInicialComponent, canActivate: [OidpGuard] },
  // { path: 'generar_reporte_personal', component: GenerarReportePersonalComponent, canActivate: [OidpGuard] },
  // { path: 'reporte/:uid', component: ReporteComponent, canActivate: [OidpGuard] },
  // // { path: 'reporte', component: ReporteComponent, canActivate: [OidpGuard] },

  // {
  //   path: 'reportes',
  //   canActivate: [OidpGuard],
  //   children: [
  //     {path: 'general', outlet: 'pantalla', component: ReporteGeneralInicialComponent},
  //     {path: 'general/generar/:fecha', component: ReporteGeneralComponent, canActivate: [OidpGuard]}
  //   ]
  // },

  // { path: 'justificaciones', component: JustificacionInicialComponent, canActivate: [OidpGuard] },
  // { path: 'justificacion_personal', component: JustificacionPersonalInicioComponent, canActivate: [OidpGuard]},
  // { path: 'justificacion_personal/:uid', component: JustificacionPersonalComponent, canActivate: [OidpGuard] },
  // { path: 'justificacion_admin', component: JustificacionAdminComponent, canActivate: [OidpGuard] },
  // { path: 'crear_justificacion', component: JustificacionModificarComponent, canActivate: [OidpGuard]},
  // { path: 'modificar_justificacion/:jid', component: JustificacionModificarComponent, canActivate: [OidpGuard]},
  // {
  //   path: 'justificaciones2',
  //   canActivate: [OidpGuard],
  //   children: [
  //     {path:'general', component: JustificacionGeneralComponent, canActivate: [OidpGuard]}
  //   ]
  // },

  // { path: 'horarios', component: HorarioInicialComponent, canActivate: [OidpGuard] },
  // { path: 'horario_detalle/:uid', component: HorarioDetalleComponent, canActivate: [OidpGuard] },
  // { path: 'horario_modificar/:uid', component: HorarioModificarComponent, canActivate: [OidpGuard] },

  // {
  //   path: 'relojes',
  //   canActivate: [OidpGuard],
  //   children: [
  //     { path: 'buscar', outlet: 'pantalla', component: SeleccionarRelojComponent },
  //     { path: 'reloj/:rid/detalle', outlet: 'pantalla', component: DetalleRelojComponent, canActivate: [OidpGuard]},
  //     { path: 'reloj/:rid/usuarios', outlet: 'pantalla', component: UsuariosRelojComponent, canActivate: [OidpGuard]},
  //     { path: 'reloj/:rid/usuarios/:ruid', outlet: 'pantalla', component: DetalleUsuarioRelojComponent, canActivate: [OidpGuard]}
  //   ]
  // },

  { path: 'loader', component: LoaderComponent }
  // { path: '', redirectTo: 'loader', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
