import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDetalleComponent } from './horario-detalle.component';

describe('HorarioDetalleComponent', () => {
  let component: HorarioDetalleComponent;
  let fixture: ComponentFixture<HorarioDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
