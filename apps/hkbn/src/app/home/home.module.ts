import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { LoyaltyModule } from '@perx/core/dist/perx-core';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material';
import {
  RewardsModule
} from '@perx/core/dist/perx-core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LoyaltyModule,
    QRCodeModule,
    MatButtonModule,
    RewardsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
