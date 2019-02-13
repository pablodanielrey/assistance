import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensatoriosAltaComponent } from './compensatorios-alta.component';

describe('CompensatoriosAltaComponent', () => {
  let component: CompensatoriosAltaComponent;
  let fixture: ComponentFixture<CompensatoriosAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensatoriosAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensatoriosAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
