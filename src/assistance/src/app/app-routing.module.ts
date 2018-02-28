import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { ReporteInicialComponent } from './reporte-inicial/reporte-inicial.component';
import { GenerarReportePersonalComponent } from './generar-reporte-personal/generar-reporte-personal.component';
import { ReporteComponent } from './reporte/reporte.component';

import { SeleccionarRelojComponent } from './seleccionar-reloj/seleccionar-reloj.component';
import { DetalleRelojComponent } from './detalle-reloj/detalle-reloj.component';

const routes: Routes = [
  { path: 'reporte_inicial', component: ReporteInicialComponent },
  { path: 'generar_reporte_personal', component: GenerarReportePersonalComponent },
  { path: 'reporte/:uid', component: ReporteComponent },
  { path: 'reporte', component: ReporteComponent },

  { path: 'admin_relojes', component: SeleccionarRelojComponent },
  { path: 'detalle_reloj/:rid', component: DetalleRelojComponent },

  { path: 'inicial', component: PantallaPrincipalComponent },
  { path: '', redirectTo: '/inicial', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
