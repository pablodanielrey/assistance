import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensatoriosModificarComponent } from './compensatorios-modificar.component';

describe('CompensatoriosModificarComponent', () => {
  let component: CompensatoriosModificarComponent;
  let fixture: ComponentFixture<CompensatoriosModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensatoriosModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensatoriosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
