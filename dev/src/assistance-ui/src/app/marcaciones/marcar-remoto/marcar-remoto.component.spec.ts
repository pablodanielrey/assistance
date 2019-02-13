import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarRemotoComponent } from './marcar-remoto.component';

describe('MarcarRemotoComponent', () => {
  let component: MarcarRemotoComponent;
  let fixture: ComponentFixture<MarcarRemotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcarRemotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarRemotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
