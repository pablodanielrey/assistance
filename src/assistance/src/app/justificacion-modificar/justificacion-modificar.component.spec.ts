import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionModificarComponent } from './justificacion-modificar.component';

describe('JustificacionModificarComponent', () => {
  let component: JustificacionModificarComponent;
  let fixture: ComponentFixture<JustificacionModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
