import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMerchantComponent } from './containers/create-merchant/create-merchant.component';
import { ListMerchantComponent } from './containers/list-merchant/list-merchant.component';

@NgModule({
  declarations: [CreateMerchantComponent, ListMerchantComponent],
  imports: [
    CommonModule
  ]
})
export class MerchantsModule { }
