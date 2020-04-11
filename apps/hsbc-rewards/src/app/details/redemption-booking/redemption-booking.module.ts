import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';

import { RedemptionBookingComponent } from './redemption-booking.component';
import { RedemptionBookingRoutingModule } from './redemption-booking-routing.module';

import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { SharedModule } from '../../shared/shared.module';
import { RewardsModule, VouchersModule, UtilsModule, ConfigModule, MerchantsModule } from '@perxtech/core';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RedemptionBookingComponent],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    CommonModule,
    RedemptionBookingRoutingModule,
    DetailHeaderModule,
    SharedModule,
    MerchantsModule,
    RewardsModule,
    VouchersModule,
    UtilsModule,
    MatSelectInfiniteScrollModule,
  ]
})
export class RedemptionBookingModule { }
