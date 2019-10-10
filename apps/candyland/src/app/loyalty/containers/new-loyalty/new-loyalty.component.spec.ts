import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoyaltyComponent } from './new-loyalty.component';

describe('NewLoyaltyComponent', () => {
  let component: NewLoyaltyComponent;
  let fixture: ComponentFixture<NewLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
