import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SusscessfullRedemptionRoutingModule } from './successful-redemption-routing.module';
import { SuccessfulRedemptionComponent } from './successful-redemption.component';
import { HeaderModule } from '../../header/header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SuccessfulRedemptionComponent],
  imports: [
    CommonModule,
    SusscessfullRedemptionRoutingModule,
    HeaderModule,
    SharedModule
  ]
})
export class SuccessfulRedemptionModule { }
