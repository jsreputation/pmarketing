import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatePickerFilterComponent } from './range-date-picker-filter.component';

describe('RangeDatePickerFilterComponent', () => {
  let component: RangeDatePickerFilterComponent;
  let fixture: ComponentFixture<RangeDatePickerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeDatePickerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDatePickerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
