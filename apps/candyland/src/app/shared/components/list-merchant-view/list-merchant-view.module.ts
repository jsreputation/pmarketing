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
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { TranslateModule } from '@ngx-translate/core';

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
