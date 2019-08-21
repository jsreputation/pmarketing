import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import { DynamicCreateService } from 'src/app/shared/service/dynamic-create.service';
import { RedeemRoutingModule } from './redeem-routing.module';

@NgModule({
  declarations: [RedeemComponent],
  imports: [
    CommonModule,
    RedeemRoutingModule
  ],
  providers: [
    DynamicCreateService
  ]
})
export class RedeemModule { }
