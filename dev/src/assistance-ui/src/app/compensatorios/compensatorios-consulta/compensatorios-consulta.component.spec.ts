import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensatoriosConsultaComponent } from './compensatorios-consulta.component';

describe('CompensatoriosConsultaComponent', () => {
  let component: CompensatoriosConsultaComponent;
  let fixture: ComponentFixture<CompensatoriosConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensatoriosConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensatoriosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
