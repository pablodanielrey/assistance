import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  { path: 'reporte/:id', component: ReporteComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: '', redirectTo: '/reporte', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
