import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignsListPageComponent } from './campaigns-list-page.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule
} from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { RangeDatePickerFilterModule } from '@cl-shared/components/range-date-picker-filter/range-date-picker-filter.module';
import {
  SeparateRangeDatePickerFilterModule
} from '@cl-shared/table/separate-range-date-picker-filter/separate-range-date-picker-filter.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('CampaignsListPageComponent', () => {
  let component: CampaignsListPageComponent;
  let fixture: ComponentFixture<CampaignsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        StatusLabelModule,
        TableFiltersModule,
        SearchFilterModule,
        TabsFilterModule,
        RangeDatePickerFilterModule,
        ButtonModule,
        SeparateRangeDatePickerFilterModule,
        NoDataModule
      ],
      declarations: [CampaignsListPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
