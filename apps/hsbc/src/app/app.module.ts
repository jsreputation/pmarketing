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
  // StampService,
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
  MatSidenavModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { SoundModule } from './sound/sound.module';
import { TncComponent } from './tnc/tnc.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigateToolbarComponent } from './navigate-toolbar/navigate-toolbar.component';
// import { of } from 'rxjs';
// import { stampCard } from './mock/stamp.mock';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
// import { puzzle } from './mock/puzzle.mock';

// const stampServiceStub = {
//   getCurrentCard: () => of(stampCard),
//   getStamps: () => of(),
//   getCards: () => of()
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
    AccountComponent
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
    HttpClientModule
  ],
  providers: [
    DatePipe,
    {provide: APP_BASE_HREF, useValue: environment.baseHref },
    // { provide: StampService, useValue: stampServiceStub }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
