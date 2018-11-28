import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensatoriosInicialComponent } from './compensatorios-inicial.component';

describe('CompensatoriosInicialComponent', () => {
  let component: CompensatoriosInicialComponent;
  let fixture: ComponentFixture<CompensatoriosInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensatoriosInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensatoriosInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
