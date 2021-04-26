import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerSupportRoutingModule } from './customer-support-routing.module';
import { CustomerSupportComponent } from './customer-support.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
