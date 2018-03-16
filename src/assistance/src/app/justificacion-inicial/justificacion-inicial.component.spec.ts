import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionInicialComponent } from './justificacion-inicial.component';

describe('JustificacionInicialComponent', () => {
  let component: JustificacionInicialComponent;
  let fixture: ComponentFixture<JustificacionInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
