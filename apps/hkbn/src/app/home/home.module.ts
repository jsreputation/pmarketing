import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { LoyaltyModule } from '@perx/core/dist/perx-core';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material';
import {
  RewardsModule
} from '@perx/core/dist/perx-core';
import { EnlargedQrComponent } from './containers/enlarged-qr/enlarged-qr.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, EnlargedQrComponent],
  imports: [
    CommonModule,
    LoyaltyModule,
    QRCodeModule,
    MatButtonModule,
    RewardsModule,
    RouterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
