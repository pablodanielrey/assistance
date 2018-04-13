import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarJustificacionComponent } from './dialogo-eliminar-justificacion.component';

describe('DialogoEliminarJustificacionComponent', () => {
  let component: DialogoEliminarJustificacionComponent;
  let fixture: ComponentFixture<DialogoEliminarJustificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEliminarJustificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarJustificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
