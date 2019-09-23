import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSupportRoutingModule } from './customer-support-routing.module';
import { CustomerSupportComponent } from './customer-support.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [CustomerSupportComponent],
  imports: [
    CommonModule,
    CustomerSupportRoutingModule,
    MatButtonModule
  ]
})
export class CustomerSupportModule { }
