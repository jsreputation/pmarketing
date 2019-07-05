import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListPageComponent } from './engagements-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EngagementsListPageComponent', () => {
  let component: EngagementsListPageComponent;
  let fixture: ComponentFixture<EngagementsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        StatusLabelModule,
        TableFiltersModule,
        SearchFilterModule,
        TabsFilterModule,
        MatDialogModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        ButtonModule,
        NoDataModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ],
      declarations: [ EngagementsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
