import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGeneralInicialComponent } from './reporte-general-inicial.component';

describe('ReporteGeneralInicialComponent', () => {
  let component: ReporteGeneralInicialComponent;
  let fixture: ComponentFixture<ReporteGeneralInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteGeneralInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGeneralInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
