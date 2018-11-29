import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcacionesUsuarioPorFechaComponent } from './marcaciones-usuario-por-fecha.component';

describe('MarcacionesUsuarioPorFechaComponent', () => {
  let component: MarcacionesUsuarioPorFechaComponent;
  let fixture: ComponentFixture<MarcacionesUsuarioPorFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcacionesUsuarioPorFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcacionesUsuarioPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
