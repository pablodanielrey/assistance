import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteHorasSemanalComponent } from './reporte-horas-semanal.component';

describe('ReporteHorasSemanalComponent', () => {
  let component: ReporteHorasSemanalComponent;
  let fixture: ComponentFixture<ReporteHorasSemanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteHorasSemanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteHorasSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
