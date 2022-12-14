import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { LoyaltyModule } from '@perxtech/core';
import { QRCodeModule } from 'angularx-qrcode';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  RewardsModule,
  VouchersModule
} from '@perxtech/core';
import { EnlargedQrComponent } from './containers/enlarged-qr/enlarged-qr.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HomeComponent, EnlargedQrComponent],
  imports: [
    CommonModule,
    LoyaltyModule,
    QRCodeModule,
    MatButtonModule,
    RewardsModule,
    VouchersModule,
    RouterModule,
    MatIconModule,
    TranslateModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
