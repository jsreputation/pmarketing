import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedeemedRoutingModule } from './redeemed-routing.module';
import { RedeemedComponent } from './redeemed.component';


@NgModule({
  declarations: [RedeemedComponent],
  imports: [
    CommonModule,
    RedeemedRoutingModule
  ]
})
export class RedeemedModule { }
