import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarUsuarioJustificacionesComponent } from './seleccionar-usuario-justificaciones.component';

describe('SeleccionarUsuarioJustificacionesComponent', () => {
  let component: SeleccionarUsuarioJustificacionesComponent;
  let fixture: ComponentFixture<SeleccionarUsuarioJustificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarUsuarioJustificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarUsuarioJustificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
