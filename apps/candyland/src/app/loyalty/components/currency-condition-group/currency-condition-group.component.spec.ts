import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConditionGroupComponent } from './currency-condition-group.component';

describe('AmountConditionGroupComponent', () => {
  let component: CurrencyConditionGroupComponent;
  let fixture: ComponentFixture<CurrencyConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyConditionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
