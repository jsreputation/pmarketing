import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMerchantComponent } from './select-merchant.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';

@NgModule({
  declarations: [
    SelectMerchantComponent,
    MerchantListComponent
  ],
  exports: [
    SelectMerchantComponent
  ],
  entryComponents: [
    SelectMerchantComponent
  ],
  imports: [
    CommonModule,
    TableFiltersModule,
    ButtonModule,


    MatDialogModule,
    MatIconModule,

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
  ]
})
export class SelectMerchantModule { }
