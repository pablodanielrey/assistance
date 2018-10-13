import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInicialComponent } from './reporte-inicial.component';

describe('ReporteInicialComponent', () => {
  let component: ReporteInicialComponent;
  let fixture: ComponentFixture<ReporteInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
