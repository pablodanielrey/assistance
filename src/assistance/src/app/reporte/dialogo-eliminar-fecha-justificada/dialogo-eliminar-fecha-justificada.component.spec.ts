import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminarFechaJustificadaComponent } from './dialogo-eliminar-fecha-justificada.component';

describe('DialogoEliminarFechaJustificadaComponent', () => {
  let component: DialogoEliminarFechaJustificadaComponent;
  let fixture: ComponentFixture<DialogoEliminarFechaJustificadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEliminarFechaJustificadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEliminarFechaJustificadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
