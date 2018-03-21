import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { GaleriaComponent } from './galeria/galeria.component';

import { SeleccionarRelojComponent } from './relojes/seleccionar-reloj/seleccionar-reloj.component';
import { DetalleRelojComponent } from './relojes/detalle-reloj/detalle-reloj.component';
import { UsuariosRelojComponent } from './relojes/usuarios-reloj/usuarios-reloj.component';
import { DetalleUsuarioRelojComponent } from './relojes/detalle-usuario-reloj/detalle-usuario-reloj.component';

import { ReporteInicialComponent } from './reporte/reporte-inicial/reporte-inicial.component';
import { GenerarReportePersonalComponent } from './reporte/generar-reporte-personal/generar-reporte-personal.component';
import { ReporteComponent } from './reporte/reporte/reporte.component';

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
  { path: 'reporte_inicial', component: ReporteInicialComponent },
  { path: 'generar_reporte_personal', component: GenerarReportePersonalComponent },
  { path: 'reporte/:uid', component: ReporteComponent },
  { path: 'reporte', component: ReporteComponent },

  { path: 'justificaciones', component: JustificacionInicialComponent },
  { path: 'justificacion_personal', component: JustificacionPersonalInicioComponent},
  { path: 'justificacion_personal/:uid', component: JustificacionPersonalComponent },
  { path: 'justificacion_admin', component: JustificacionAdminComponent },
  { path: 'crear_justificacion', component: JustificacionModificarComponent},
  { path: 'modificar_justificacion/:jid', component: JustificacionModificarComponent},
  {
    path: 'justificaciones2',
    children: [
      {path:'general', component: JustificacionGeneralComponent}
    ]
  },

  { path: 'horarios', component: HorarioInicialComponent },
  { path: 'horario_detalle/:uid', component: HorarioDetalleComponent },
  { path: 'horario_modificar/:uid', component: HorarioModificarComponent },

  {
    path: 'relojes',
    children: [
      { path: 'buscar', component: SeleccionarRelojComponent },
      { path: 'reloj/:rid/detalle', component: DetalleRelojComponent },
      { path: 'reloj/:rid/usuarios', component: UsuariosRelojComponent },
      { path: 'reloj/:rid/usuarios/:ruid', component: DetalleUsuarioRelojComponent }
    ]
  },

  { path: 'galeria', component: GaleriaComponent },
  { path: 'inicial', component: PantallaPrincipalComponent },
  { path: '', redirectTo: '/inicial', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
