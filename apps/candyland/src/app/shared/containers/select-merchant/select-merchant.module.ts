import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMerchantViewModule } from '@cl-shared/components/list-merchant-view/list-merchant-view.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { SelectMerchantComponent } from './select-merchant.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';

@NgModule({
  declarations: [
    SelectMerchantComponent
  ],
  exports: [
    SelectMerchantComponent
  ],
  entryComponents: [
    SelectMerchantComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    PaginationModule,
    ListMerchantViewModule
  ]
})
export class SelectMerchantModule { }
