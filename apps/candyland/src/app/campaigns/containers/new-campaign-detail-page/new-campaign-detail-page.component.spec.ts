import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignDetailPageComponent } from './new-campaign-detail-page.component';
import { forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerModule } from '@cl-shared/components/time-picker/time-picker.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { ItemListModule } from '@cl-shared/components/item-list/item-list.module';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';
import { DateTimePickerModule } from '@cl-shared/components/date-time-picker/date-time-picker.module';
import { SmsEditorModule } from '@cl-shared/components/sms-editor/sms-editor.module';
import { Component } from '@angular/core';

@Component({
  selector: 'cl-date-picker',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class DatePickerComponent implements ControlValueAccessor{
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}

describe('NewCampaignDetailPageComponent', () => {
  let component: NewCampaignDetailPageComponent;
  let fixture: ComponentFixture<NewCampaignDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        // MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatStepperModule,
        StatusLabelModule,
        TableFiltersModule,
        SearchFilterModule,
        TabsFilterModule,
        // RangeDatePickerFilterModule,
        ButtonModule,
        // SeparateRangeDatePickerFilterModule,
        NoDataModule,
        EngagementItemModule,
        ItemListModule,
        MatRadioModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatChipsModule,
        ProgressBarModule,
        DateTimePickerModule,
        TimePickerModule,
        SmsEditorModule
      ],
      declarations: [NewCampaignDetailPageComponent,
        DatePickerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
