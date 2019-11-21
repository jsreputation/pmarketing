import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatePickerComponent } from './range-date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RangeDatePickerComponent', () => {
  let component: RangeDatePickerComponent;
  let fixture: ComponentFixture<RangeDatePickerComponent>;

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
      declarations: [RangeDatePickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
