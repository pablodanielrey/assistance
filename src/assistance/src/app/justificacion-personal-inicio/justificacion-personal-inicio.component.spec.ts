import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionPersonalInicioComponent } from './justificacion-personal-inicio.component';

describe('JustificacionPersonalInicioComponent', () => {
  let component: JustificacionPersonalInicioComponent;
  let fixture: ComponentFixture<JustificacionPersonalInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionPersonalInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionPersonalInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
