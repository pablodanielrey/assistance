import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarRelojComponent } from './seleccionar-reloj.component';

describe('SeleccionarRelojComponent', () => {
  let component: SeleccionarRelojComponent;
  let fixture: ComponentFixture<SeleccionarRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
