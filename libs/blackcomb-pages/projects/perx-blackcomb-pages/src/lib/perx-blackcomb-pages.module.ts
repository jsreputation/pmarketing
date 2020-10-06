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
  MatInputModule,
  MatTableModule, MatAutocompleteModule
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
  RankModule,
  LocationModule,
  CampaignServiceModule,
  ProgressBarModule
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
import { StampCardModule } from './stamp-card/stamp-card.module';
import { SurveyComponent } from './survey/survey.component';
import { VoucherDetailModule } from './voucher-detail/voucher-detail.module';
import { WalletModule } from './wallet/wallet.module';
import { SignUpModule } from './sign-up/sign-up.module';
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
import { CampaignStampsModule } from './campaign-stamps/campaign-stamps.module';
import { CatalogModule } from './catalog/catalog.module';
import { QuizModule as BCPQuizModule } from './quiz/quiz.module';
import { QuizResultsModule } from './quiz-results/quiz-results.module';
import { LuckyDrawDetailsComponent } from './lucky-draw-details/lucky-draw-details.component';
import { CampaignLandingPageModule } from './campaign-landing-page/campaign-landing-page.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { ReferralComponent } from './referral/referral.component';
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { SignIn2Module } from './sign-in-2/sign-in-2.module';
import { ProfileModule as BCPProfileModule } from './profile/profile.module';
import { FindLocationModule } from './find-location/find-location.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NearmeComponent } from './nearme/nearme.component';
import { RewardsPageComponent } from './rewards-page/rewards-page.component';
import { FavoriteRewardsComponent } from './favorite-rewards/favorite-rewards.component';
import { ProgressCampaignHomeModule } from './progress-campaign-home/progress-campaign-home.module';
import { PageComponentsModule } from './page-components/page-components.module';
import { ProgressCampaignModule } from './progress-campaign/progress-campaign.module';
import { RewardVoucherDetailModule } from './reward-voucher-detail/reward-voucher-detail.module';
import { RazAdaptedCampaignsCollectionModule } from './raz-adapted-campaigns-collection/raz-adapted-campaigns-collection.module';
import { FilterDialogComponent } from './nearme/filter-dialog/filter-dialog.component';


const comps: any[] = [
  RewardComponent,
  LoadingComponent,
  SignInComponent,
  SurveyComponent,
  TransactionHistoryComponent,
  ChangePasswordComponent,
  RewardsBookingComponent,
  LuckyDrawDetailsComponent,
  ReferralComponent,
  LeaderboardPageComponent,
  NearmeComponent,
  RewardsPageComponent,
  FavoriteRewardsComponent,
  FilterDialogComponent,
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
    HomeModule,
    CampaignStampsModule,
    StampCardModule,
    SignUpModule,
    BCPQuizModule,
    QuizResultsModule,
    CampaignLandingPageModule,
    LocationModule,
    FindLocationModule,
    MatSelectInfiniteScrollModule,
    MatAutocompleteModule,
    CampaignServiceModule.forRoot(),
    ProgressCampaignHomeModule,
    PageComponentsModule,
    ProgressCampaignModule,
    RewardVoucherDetailModule,
    ProgressBarModule,
    RazAdaptedCampaignsCollectionModule
  ],
  exports: [
    ...comps,
  ],
  declarations: [
    ...comps,
  ],
  providers: [
    SecondsToStringPipe
  ],
  entryComponents: [FilterDialogComponent]
})
export class PerxBlackcombPagesModule {
}
