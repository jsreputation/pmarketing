import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSupportRoutingModule } from './customer-support-routing.module';
import { CustomerSupportComponent } from './customer-support.component';
import { MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { CallUsComponent } from './call-us/call-us.component';

@NgModule({
  declarations: [CustomerSupportComponent, CallUsComponent],
  imports: [
    CommonModule,
    CustomerSupportRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  entryComponents: [
    CallUsComponent
  ]
})
export class CustomerSupportModule { }
