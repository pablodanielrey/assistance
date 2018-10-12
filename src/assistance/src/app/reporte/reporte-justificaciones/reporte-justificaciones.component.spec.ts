import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteJustificacionesComponent } from './reporte-justificaciones.component';

describe('ReporteJustificacionesComponent', () => {
  let component: ReporteJustificacionesComponent;
  let fixture: ComponentFixture<ReporteJustificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteJustificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteJustificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
