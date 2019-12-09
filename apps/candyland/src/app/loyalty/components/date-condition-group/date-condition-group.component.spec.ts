import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateConditionGroupComponent } from './date-condition-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DateConditionGroupComponent', () => {
  let component: DateConditionGroupComponent;
  let fixture: ComponentFixture<DateConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateConditionGroupComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
