import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { ListMerchantViewComponent } from 'src/app/shared/components/list-merchant-view/list-merchant-view.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { TranslateModule } from '@ngx-translate/core';
import { StatusLabelModule } from '@perxtech/candyshop';

@NgModule({
  declarations: [
    ListMerchantViewComponent
  ],
  exports: [
    ListMerchantViewComponent
  ],
  imports: [
    CommonModule,
    StatusLabelModule,
    TableFiltersModule,

    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    PipesModule,
    TranslateModule
  ]
})
export class ListMerchantViewModule { }
