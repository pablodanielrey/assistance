import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionPersonalComponent } from './justificacion-personal.component';

describe('JustificacionPersonalComponent', () => {
  let component: JustificacionPersonalComponent;
  let fixture: ComponentFixture<JustificacionPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
