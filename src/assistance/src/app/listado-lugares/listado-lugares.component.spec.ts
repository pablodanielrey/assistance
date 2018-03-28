import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLugaresComponent } from './listado-lugares.component';

describe('ListadoLugaresComponent', () => {
  let component: ListadoLugaresComponent;
  let fixture: ComponentFixture<ListadoLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
