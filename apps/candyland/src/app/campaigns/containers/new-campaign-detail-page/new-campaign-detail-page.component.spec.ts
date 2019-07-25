import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCampaignDetailPageComponent } from './new-campaign-detail-page.component';
import { Component, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { ItemListModule } from '@cl-shared/components/item-list/item-list.module';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';

@Component({
  selector: 'cl-date-picker',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestDatePickerComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TestDatePickerComponent {
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}

@Component({
  selector: 'cl-time-picker',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestTimePickerComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TestTimePickerComponent {
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}



@Component({
  selector: 'cl-chip-list',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestChipListComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TestChipListComponent {
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}

@Component({
  selector: 'cl-checkbox-group',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestCheckboxComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TestCheckboxComponent {
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}
@Component({
  selector: 'cl-sms-editor',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestEditorComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TestEditorComponent {
  registerOnChange(): void {
  }

  registerOnTouched(): void {
  }

  setDisabledState(): void {
  }

  writeValue(): void {
  }

}
@Component({
  selector: 'cl-upload-file',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TesUploadComponent),
      multi: true,
    }
  ]
})
// tslint:disable
class TesUploadComponent {
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
        ButtonModule,
        NoDataModule,
        EngagementItemModule,
        ItemListModule,
        MatRadioModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatChipsModule,
        ProgressBarModule,
      ],
      declarations: [NewCampaignDetailPageComponent, TestDatePickerComponent, TestTimePickerComponent,
        TestChipListComponent, TestCheckboxComponent, TestEditorComponent, TesUploadComponent],
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
