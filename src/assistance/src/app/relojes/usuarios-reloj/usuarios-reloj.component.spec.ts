import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRelojComponent } from './usuarios-reloj.component';

describe('UsuariosRelojComponent', () => {
  let component: UsuariosRelojComponent;
  let fixture: ComponentFixture<UsuariosRelojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosRelojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
