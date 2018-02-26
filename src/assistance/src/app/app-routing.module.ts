import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReporteInicialComponent } from './reporte-inicial/reporte-inicial.component';
import { GenerarReportePersonalComponent } from './generar-reporte-personal/generar-reporte-personal.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: 'reporte_inicial/', component: ReporteInicialComponent },
  { path: 'generar_reporte_personal/', component: GenerarReportePersonalComponent },
  { path: 'reporte/:uid', component: ReporteComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: '', redirectTo: '/reporte', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
