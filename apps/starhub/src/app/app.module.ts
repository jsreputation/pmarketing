import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AuthenticationModule,
  UtilsModule,
  ProfileModule,
  LocationsService,
  RewardsService,
  VouchersService,
  PinService,
  GameModule,
  CampaignService,
  GameService,
  VouchersModule
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
import { locations } from './locations.mock';
import { of } from 'rxjs';
import { rewards } from './rewards.mock';
import { vouchers } from './vouchers.mock';
import { catalogs } from './catalogs.mock';
import { RewardsSortPipe } from './category/rewards-sort.pipe';
import { LocationShortFormatComponent } from './location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward/reward-detail/reward-detail.component';
import { GameComponent } from './game/game.component';
import { campaigns } from './campaigns.mock';
import { CongratsComponent } from './congrats/congrats.component';
import { game } from './game.mock';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';
import { HttpClientModule } from '@angular/common/http';

const locationServiceStub = {
  getFromMerchant: () => of(locations)
};

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => of(catalogs[id]),
  reserveReward: () => of(vouchers[1]),
  issueReward: () => of(vouchers[1])
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: () => of(vouchers[1])
};

const pinServiceStub = {
  getPin: () => of('2222')
};

const campaignServiceStub = {
  getCampaigns: () => of(campaigns)
};

const gameServiceStub = {
  get: () => of(game)
};

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
    GameComponent,
    CongratsComponent,
    RewardPopupComponent,
    ExpireTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    GameModule,
    ProfileModule.forRoot({ env: environment }),
    HttpClientModule,
    AuthenticationModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment }),
    VouchersModule.forRoot({ env: environment })

  ],
  entryComponents: [
    CategorySelectComponent,
    CategorySortComponent,
    RewardPopupComponent
  ],
  providers: [
    { provide: LocationsService, useValue: locationServiceStub },
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: VouchersService, useValue: vouchersServiceStub },
    { provide: PinService, useValue: pinServiceStub },
    { provide: CampaignService, useValue: campaignServiceStub },
    { provide: GameService, useValue: gameServiceStub },
    { provide: VouchersService, useValue: vouchersServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
