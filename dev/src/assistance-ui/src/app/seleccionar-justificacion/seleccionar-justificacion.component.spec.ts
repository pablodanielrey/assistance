import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarJustificacionComponent } from './seleccionar-justificacion.component';

describe('SeleccionarJustificacionComponent', () => {
  let component: SeleccionarJustificacionComponent;
  let fixture: ComponentFixture<SeleccionarJustificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarJustificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarJustificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
