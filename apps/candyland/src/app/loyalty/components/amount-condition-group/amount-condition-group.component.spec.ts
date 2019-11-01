import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountConditionGroupComponent } from './amount-condition-group.component';

describe('AmountConditionGroupComponent', () => {
  let component: AmountConditionGroupComponent;
  let fixture: ComponentFixture<AmountConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountConditionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
