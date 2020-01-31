import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantsRoutingModule } from './merchants-routing.module';
import { MerchantsComponent } from './merchants.component';


@NgModule({
  declarations: [MerchantsComponent],
  imports: [
    CommonModule,
    MerchantsRoutingModule
  ]
})
export class MerchantsModule { }
