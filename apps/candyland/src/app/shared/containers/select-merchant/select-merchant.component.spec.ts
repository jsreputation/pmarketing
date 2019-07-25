import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMerchantComponent } from './select-merchant.component';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import {
  MAT_DIALOG_DATA, MatButtonModule,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { Component, Input } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'cl-merchant-list',
  template: ''
})
class TestMerchantListComponent {
  @Input() public dataSource: any;
}

describe('SelectMerchantComponent', () => {
  let component: SelectMerchantComponent;
  let fixture: ComponentFixture<SelectMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TableFiltersModule,
        ButtonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,

        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        StatusLabelModule,
        TableFiltersModule,
        SearchFilterModule,
      ],
      declarations: [
        SelectMerchantComponent,
        TestMerchantListComponent
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
