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
  LocationsService,
  RewardsService,
  VouchersService
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

const locationServiceStub = {
  getFromMerchant: () => of(locations)
};

const rewardsServiceStub = {
  getReward: () => of(rewards[0]),
  getAllRewards: () => of(rewards),
  getAllCatalogs: () => of(catalogs),
  getCatalog: (id: number) => of(catalogs[id])
};

const vouchersServiceStub = {
  getAll: () => of(vouchers),
  get: () => of(vouchers[0])
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
    LocationShortFormatComponent
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
    CognitoModule.forRoot({ env: environment }),
    OauthModule.forRoot({ env: environment }),
    ProfileModule.forRoot({ env: environment })
  ],
  entryComponents: [
    CategorySelectComponent,
    CategorySortComponent
  ],
  providers: [
    { provide: LocationsService, useValue: locationServiceStub },
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: VouchersService, useValue: vouchersServiceStub }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
