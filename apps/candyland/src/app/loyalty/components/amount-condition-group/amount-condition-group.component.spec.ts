import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountConditionGroupComponent } from './amount-condition-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AmountConditionGroupComponent', () => {
  let component: AmountConditionGroupComponent;
  let fixture: ComponentFixture<AmountConditionGroupComponent>;
  let group: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [AmountConditionGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountConditionGroupComponent);
    component = fixture.componentInstance;
    group = new FormGroup({
      operator: new FormControl(),
      value: new FormControl()
    });
    component.group = group;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
