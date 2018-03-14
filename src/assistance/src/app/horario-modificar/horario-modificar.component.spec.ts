import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioModificarComponent } from './horario-modificar.component';

describe('HorarioModificarComponent', () => {
  let component: HorarioModificarComponent;
  let fixture: ComponentFixture<HorarioModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
