import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmountConditionGroupComponent } from './amount-condition-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

describe('AmountConditionGroupComponent', () => {
  let component: AmountConditionGroupComponent;
  let fixture: ComponentFixture<AmountConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AmountConditionGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountConditionGroupComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      operator: new FormControl(),
      value: new FormControl()
    });
    component.config = {ruleOperators: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
