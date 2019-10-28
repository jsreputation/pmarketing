import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PerxCoreModule,
  AuthenticationModule,
  CampaignModule,
  VouchersModule,
  MerchantsModule,
  ProfileModule,
  StampModule,
  UtilsModule,
  ConfigModule,
  RewardsModule,

  // ICampaignService,
  // ConfigService
  // StampService,
  // ICampaignService
} from '@perx/core';
import { environment } from '../environments/environment';
import {
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatDialogModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { SoundModule } from './sound/sound.module';
import { TncComponent } from './tnc/tnc.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigateToolbarComponent } from './navigate-toolbar/navigate-toolbar.component';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';

// import { PuzzleListComponent } from './mock/service/puzzle-list/puzzle-list.component';
// import { of } from 'rxjs';
// import { stampCard } from './mock/stamp.mock';
// import { puzzle } from './mock/puzzle.mock';
// import { campaigns } from './mock/campaigns.mock';

// const stampServiceStub = {
//   getCurrentCard: (id: number) => {
//     if (id === 100) {
//       return of(puzzle[0]);
//     }
//
//     if (id === 265) {
//       return of(stampCard[0]);
//     }
//   },
//   getStamps: () => of(),
//   getCards: (id: number) => {
//     if (id === 100) {
//       return of(puzzle);
//     }
//
//     if (id === 265) {
//       return of(stampCard);
//     }
//   },
//   putStamp: () => of(stampCard)
// };
//
// const campaignServiceStub = {
//   getCampaigns: () => of(campaigns)
// };

// const configServiceStub = {
//   getTenantAppSettings: () => of({
//     id: 1,
//     key: 'hsbc-xmas',
//     stringValue: '',
//     jsonValue: {
//       background: 'assets/xmas_background.jpg',
//       source_type: 'hsbc-xmas',
//     },
//   }),
//   readAppConfig: () => of({
//     preAuth: false,
//     sourceType: 'hsbc-xmas'
//   })
// };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PuzzleComponent,
    VoucherComponent,
    RedemptionComponent,
    HomeComponent,
    PuzzlesComponent,
    TncComponent,
    FaqComponent,
    ProfileComponent,
    NavigateToolbarComponent,
    WalletComponent,
    AccountComponent,
    RewardPopupComponent

    // PuzzleListComponent, // mock service/component
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    PerxCoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,
    SoundModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    UtilsModule,
    VouchersModule,
    RewardsModule,
    MerchantsModule,
    AuthenticationModule,
    CampaignModule,
    ProfileModule,
    StampModule,
    FormsModule,
    RewardsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    DatePipe,
    {provide: APP_BASE_HREF, useValue: environment.baseHref },
    // { provide: ConfigService, useValue: configServiceStub },
    // { provide: StampService, useValue: stampServiceStub },
    // { provide: ICampaignService, useValue: campaignServiceStub },
  ],
  bootstrap: [AppComponent],
  entryComponents: [RewardPopupComponent]
})
export class AppModule { }
