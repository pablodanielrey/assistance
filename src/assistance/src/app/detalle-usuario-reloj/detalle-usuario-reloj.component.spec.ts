import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioRelojComponent } from './detalle-usuario-reloj.component';

describe('DetalleUsuarioRelojComponent', () => {
  let component: DetalleUsuarioRelojComponent;
  let fixture: ComponentFixture<DetalleUsuarioRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUsuarioRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
