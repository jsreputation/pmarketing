import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedeemedRoutingModule } from './redeemed-routing.module';
import { RedeemedComponent } from './redeemed.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [RedeemedComponent],
  imports: [
    CommonModule,
    RedeemedRoutingModule,
    UnderConstructionModule
  ]
})
export class RedeemedModule { }
