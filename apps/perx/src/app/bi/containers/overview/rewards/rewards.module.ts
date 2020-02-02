import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsComponent } from './rewards.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';


@NgModule({
  declarations: [RewardsComponent],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    UnderConstructionModule
  ]
})
export class RewardsModule { }
