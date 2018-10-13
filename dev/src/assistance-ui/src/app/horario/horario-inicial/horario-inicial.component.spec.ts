import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioInicialComponent } from './horario-inicial.component';

describe('HorarioInicialComponent', () => {
  let component: HorarioInicialComponent;
  let fixture: ComponentFixture<HorarioInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
