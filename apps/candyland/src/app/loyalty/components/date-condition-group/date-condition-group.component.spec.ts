import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateConditionGroupComponent } from './date-condition-group.component';

describe('DateConditionGroupComponent', () => {
  let component: DateConditionGroupComponent;
  let fixture: ComponentFixture<DateConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateConditionGroupComponent ]
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
