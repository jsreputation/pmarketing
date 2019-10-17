import { AccountModule } from './account/account.module';
import { of } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  VouchersModule,
  AuthenticationModule,
  GameModule,
  UtilsModule,
  ProfileModule,
  ProfileService,
  ConfigModule,
  RewardsModule,
  MerchantsModule as PerxMerchantsModule,
  CampaignModule as PerxCampaignModule,
  StampModule as PerxStampModule,
} from '@perx/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { profile } from './mock/profile.mock';
import { HttpClientModule } from '@angular/common/http';
import {
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent
} from '@perx/blackcomb-pages';
import { HomeModule } from './home/home.module';

const profileServiceStub = {
  whoAmI: () => of(profile)
};

const perxComponents = [
  HistoryComponent,
  RedeemComponent,
  LoginComponent,
  VoucherDetailComponent,
  RewardDetailsComponent,
  LoadingComponent,
  ContentComponent,
  WalletComponent
];
@NgModule({
  declarations: [
    AppComponent,
    ...perxComponents
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    BrowserModule,
    AppRoutingModule,
    PerxCoreModule,
    VouchersModule,
    AuthenticationModule,
    GameModule,
    AccountModule,
    ProfileModule,
    BrowserAnimationsModule,
    RewardsModule,
    PerxMerchantsModule,
    PerxStampModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    PerxCampaignModule,
    HttpClientModule,
    HomeModule,
  ],
  providers: [
    { provide: ProfileService, useValue: profileServiceStub },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
