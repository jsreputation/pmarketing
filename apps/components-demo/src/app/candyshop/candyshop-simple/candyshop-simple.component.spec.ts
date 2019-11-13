import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopSimpleComponent } from './candyshop-simple.component';

describe('CandyshopSimpleComponent', () => {
  let component: CandyshopSimpleComponent;
  let fixture: ComponentFixture<CandyshopSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandyshopSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
