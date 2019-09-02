import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AuthenticationModule,
  CognitoModule,
  OauthModule,
  UtilsModule,
  ProfileModule,
  RewardsModule,
  VouchersModule,
} from '@perx/core';
import { environment } from '../environments/environment';
import {
  MatDialogModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatRippleModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatDividerModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './category/category.component';
import { RewardComponent } from './reward/reward.component';
import { LocationsComponent } from './locations/locations.component';
import { TncComponent } from './tnc/tnc.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { CategorySelectComponent } from './category/category-select/category-select.component';
import { CategorySortComponent } from './category/category-sort/category-sort.component';
import { RewardsSortPipe } from './category/rewards-sort.pipe';
import { LocationShortFormatComponent } from './location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward/reward-detail/reward-detail.component';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    RewardComponent,
    LocationsComponent,
    TncComponent,
    VoucherComponent,
    RedemptionComponent,
    CategorySelectComponent,
    CategorySortComponent,
    RewardsSortPipe,
    LocationShortFormatComponent,
    RewardDetailComponent,
    RewardPopupComponent,
    ExpireTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatDividerModule,
    UtilsModule,
    BrowserAnimationsModule,
    RewardsModule.forRoot({ env: environment }),
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment }),
    VouchersModule.forRoot({ env: environment })

  ],
  entryComponents: [
    CategorySelectComponent,
    CategorySortComponent,
    RewardPopupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
