import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataModule } from '@cl-shared/table';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { CreateMerchantComponent } from './containers/create-merchant/create-merchant.component';
import { ListMerchantComponent } from './containers/list-merchant/list-merchant.component';
import { DetailedMerchantComponent } from './containers/detailed-merchant/detailed-merchant.component';
import { MerchantRoutingModule } from './merchant-routing.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatPaginatorModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMerchantFormModule } from '@cl-shared/components/create-merchant-form/create-merchant-form.module';
import { ListMerchantViewModule } from '../shared/components/list-merchant-view/list-merchant-view.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { CreateMerchantPopupModule } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.module';

@NgModule({
  declarations: [
    CreateMerchantComponent,
    ListMerchantComponent,
    DetailedMerchantComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    ReactiveFormsModule,
    CreateMerchantFormModule,
    ListMerchantViewModule,
    ButtonModule,
    CreateMerchantPopupModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    SearchFilterModule,
    TableFiltersModule,
    PaginationModule,
    NoDataModule
  ]
})
export class MerchantsModule { }
