import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentModule } from './content/content.module';
import {
  MatProgressBarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatRippleModule,
  MatGridListModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatMenuModule,
  MatInputModule, MatTableModule
} from '@angular/material';
import { GameModule } from './game/game.module';
import { HistoryModule } from './history/history.module';
import {
  UtilsModule,
  VouchersModule,
  PuzzlesModule,
  LoyaltyModule,
  RewardsModule,
  SurveyModule,
  ProfileModule,
  QuizModule,
  SecondsToStringPipe,
  RankModule
} from '@perxtech/core';

import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { SignInComponent } from './sign-in/sign-in.component';
import { RedeemModule } from './redeem/redeem.module';
import { QRModule } from './qr/qr.module';
import { RewardDetailsModule } from './reward-details/reward-details.module';
import { StampCardComponent } from './stamp-card/stamp-card.component';
import { SurveyComponent } from './survey/survey.component';
import { VoucherDetailModule } from './voucher-detail/voucher-detail.module';
import { WalletModule } from './wallet/wallet.module';
import { SignUpComponent as PerxSignUpComponent } from './sign-up/sign-up.component';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { WalletHistoryModule } from './wallet-history/wallet-history.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EnterPinModule } from './enter-pin/enter-pin.module';
import { RewardsBookingComponent } from './rewards-booking/rewards-booking.component';
import { EditProfileFieldModule } from './edit-profile-field/edit-profile-field.module';
import { ProfileBarcodeModule } from './profile-barcode/profile-barcode.module';
import { CampaignStampsComponent } from './campaign-stamps/campaign-stamps.component';
import { CatalogModule } from './catalog/catalog.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { LuckyDrawDetailsComponent } from './lucky-draw-details/lucky-draw-details.component';
import { CampaignLandingPageComponent } from './campaign-landing-page/campaign-landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ReferralComponent } from './referral/referral.component';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { SignIn2Module } from './sign-in-2/sign-in-2.module';
import { ProfileModule as BCPProfileModule } from './profile/profile.module';

const comps: any[] = [
  PerxSignUpComponent,
  RewardComponent,
  LoadingComponent,
  SignInComponent,
  StampCardComponent,
  SurveyComponent,
  TransactionHistoryComponent,
  ChangePasswordComponent,
  RewardsBookingComponent,
  CampaignStampsComponent,
  QuizComponent,
  QuizResultsComponent,
  LuckyDrawDetailsComponent,
  CampaignLandingPageComponent,
  ReferralComponent,
  LeaderboardPageComponent
];

@NgModule({
  imports: [
    UtilsModule,
    VouchersModule,
    PuzzlesModule,
    LoyaltyModule,
    RewardsModule,
    SurveyModule,
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    GameModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatRippleModule,
    MatGridListModule,
    MatTabsModule,
    NgxMultiLineEllipsisModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxBarcodeModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    TranslateModule.forChild(),
    MatToolbarModule,
    MatTableModule,
    MatListModule,
    InfiniteScrollModule,
    MatDialogModule,
    QuizModule,
    ProfileModule,
    RankModule,
    WalletModule,
    RewardDetailsModule,
    EnterPinModule,
    ForgotPasswordModule,
    SignIn2Module,
    LandingPageModule,
    VoucherDetailModule,
    AccountModule,
    EditProfileFieldModule,
    ProfileBarcodeModule,
    QRModule,
    CatalogModule,
    BCPProfileModule,
    LayoutModule,
    RedeemModule,
    ContentModule,
    WalletHistoryModule,
    HistoryModule,
    HomeModule
  ],
  exports: [
    ...comps,
  ],
  declarations: [
    ...comps
  ],
  providers: [
    SecondsToStringPipe
  ]
})
export class PerxBlackcombPagesModule {
}
