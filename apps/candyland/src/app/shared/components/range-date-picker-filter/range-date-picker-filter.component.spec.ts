import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatePickerFilterComponent } from './range-date-picker-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RangeDatePickerFilterComponent', () => {
  let component: RangeDatePickerFilterComponent;
  let fixture: ComponentFixture<RangeDatePickerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
      ],
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
