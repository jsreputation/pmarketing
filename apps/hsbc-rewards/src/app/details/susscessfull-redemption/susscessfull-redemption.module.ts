import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SusscessfullRedemptionRoutingModule } from './susscessfull-redemption-routing.module';
import { SusscessfullRedemptionComponent } from './susscessfull-redemption.component';
import { HeaderModule } from '../../header/header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SusscessfullRedemptionComponent],
  imports: [
    CommonModule,
    SusscessfullRedemptionRoutingModule,
    HeaderModule,
    SharedModule
  ]
})
export class SusscessfullRedemptionModule { }
