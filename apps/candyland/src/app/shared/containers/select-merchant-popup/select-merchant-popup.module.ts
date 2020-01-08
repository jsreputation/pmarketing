import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMerchantViewModule } from '@cl-shared/components/list-merchant-view/list-merchant-view.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { SelectMerchantPopupComponent } from './select-merchant-popup.component';
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
import { ButtonModule } from '@perx/candyshop';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SelectMerchantPopupComponent
  ],
  exports: [
    SelectMerchantPopupComponent
  ],
  entryComponents: [
    SelectMerchantPopupComponent
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
    ListMerchantViewModule,
    TranslateModule,
  ]
})
export class SelectMerchantPopupModule { }
