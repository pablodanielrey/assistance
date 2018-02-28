import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRelojComponent } from './detalle-reloj.component';

describe('DetalleRelojComponent', () => {
  let component: DetalleRelojComponent;
  let fixture: ComponentFixture<DetalleRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
