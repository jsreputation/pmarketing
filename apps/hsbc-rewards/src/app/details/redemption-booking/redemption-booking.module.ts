import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedemptionBookingComponent } from './redemption-booking.component';
import { RedemptionBookingRoutingModule } from './redemption-booking-routing.module';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RewardsModule, VouchersModule, UtilsModule, ConfigModule } from '@perx/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RedemptionBookingComponent],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    RedemptionBookingRoutingModule,
    DetailHeaderModule,
    SharedModule,
    RewardsModule,
    VouchersModule,
    UtilsModule
  ]
})
export class RedemptionBookingModule { }
