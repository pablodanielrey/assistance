import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUltimasJustificacionesComponent } from './reporte-ultimas-justificaciones.component';

describe('ReporteUltimasJustificacionesComponent', () => {
  let component: ReporteUltimasJustificacionesComponent;
  let fixture: ComponentFixture<ReporteUltimasJustificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteUltimasJustificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteUltimasJustificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
