import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionAdminComponent } from './justificacion-admin.component';

describe('JustificacionAdminComponent', () => {
  let component: JustificacionAdminComponent;
  let fixture: ComponentFixture<JustificacionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustificacionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
