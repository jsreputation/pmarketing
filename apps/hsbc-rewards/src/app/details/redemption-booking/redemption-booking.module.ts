import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedemptionBookingComponent } from './redemption-booking.component';
import { RedemptionBookingRoutingModule } from './redemption-booking-routing.module';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RewardsModule, VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RedemptionBookingComponent],
  imports: [
    CommonModule,
    RedemptionBookingRoutingModule,
    DetailHeaderModule,
    SharedModule,
    RewardsModule.forRoot({env:environment}),
    VouchersModule.forRoot({env:environment})
  ]
})
export class RedemptionBookingModule { }
