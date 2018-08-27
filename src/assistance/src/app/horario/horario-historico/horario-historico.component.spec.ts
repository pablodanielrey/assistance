import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioHistoricoComponent } from './horario-historico.component';

describe('HorarioHistoricoComponent', () => {
  let component: HorarioHistoricoComponent;
  let fixture: ComponentFixture<HorarioHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
