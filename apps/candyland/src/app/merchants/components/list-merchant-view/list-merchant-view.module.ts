import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMerchantViewComponent } from './list-merchant-view.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';

@NgModule({
  declarations: [
    ListMerchantViewComponent
  ],
  exports: [
    ListMerchantViewComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    StatusLabelModule,
    TableFiltersModule,

  ]
})
export class ListMerchantViewModule { }
