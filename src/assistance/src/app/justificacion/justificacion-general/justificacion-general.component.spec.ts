import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionGeneralComponent } from './justificacion-general.component';

describe('JustificacionGeneralComponent', () => {
  let component: JustificacionGeneralComponent;
  let fixture: ComponentFixture<JustificacionGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
