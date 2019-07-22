import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListComponent } from './engagements-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule, MatTableDataSource,
  MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusLabelModule } from '../../../shared/components/status-label/status-label.module';
import { TableFiltersModule } from '../../../shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '../../../shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '../../../shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '../../../shared/components/button/button.module';
import { NoDataModule } from '../../../shared/table/no-data/no-data.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EngagementsListComponent', () => {
  let component: EngagementsListComponent;
  let fixture: ComponentFixture<EngagementsListComponent>;

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
      declarations: [EngagementsListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<Engagement>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
