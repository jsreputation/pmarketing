import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMerchantComponent } from './containers/create-merchant/create-merchant.component';
import { ListMerchantComponent } from './containers/list-merchant/list-merchant.component';
import { DetailedMerchantComponent } from './containers/detailed-merchant/detailed-merchant.component';
import { MerchantRoutingModule } from './merchant-routing.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMerchantFormModule } from '@cl-shared/components/create-merchant-form/create-merchant-form.module';

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
    ButtonModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class MerchantsModule { }
