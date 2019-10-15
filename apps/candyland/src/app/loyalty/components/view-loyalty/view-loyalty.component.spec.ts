import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoyaltyComponent } from './view-loyalty.component';

describe('ViewLoyaltyComponent', () => {
  let component: ViewLoyaltyComponent;
  let fixture: ComponentFixture<ViewLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
