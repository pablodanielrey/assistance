import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReportePersonalComponent } from './generar-reporte-personal.component';

describe('GenerarReportePersonalComponent', () => {
  let component: GenerarReportePersonalComponent;
  let fixture: ComponentFixture<GenerarReportePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReportePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReportePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
