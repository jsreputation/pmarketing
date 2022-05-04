import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentModule } from './content/content.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameModule } from './game/game.module';
import { HistoryModule } from './history/history.module';
import {
  CampaignServiceModule,
  LocationModule,
  LoyaltyModule,
  ProfileModule,
  ProgressBarModule,
  PuzzlesModule,
  QuizModule,
  RankModule,
  RewardsModule,
  SecondsToStringPipe,
  SurveyModule,
  UtilsModule,
  VouchersModule,
} from '@perxtech/core';

import { RewardComponent } from './reward/reward.component';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcode6Module } from 'ngx-barcode6';
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
import { LeaderboardPageComponent } from './leaderboard-page/leaderboard-page.component';
import { LeaderboardsComponent } from './leaderboard/leaderboards.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { SignIn2Module } from './sign-in-2/sign-in-2.module';
import { ProfileModule as BCPProfileModule } from './profile/profile.module';
import { FindLocationModule } from './find-location/find-location.module';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { NearmeComponent } from './nearme/nearme.component';
import { RewardsPageComponent } from './rewards-page/rewards-page.component';
import { FavoriteRewardsComponent } from './favorite-rewards/favorite-rewards.component';
import { RazProgressCampaignHomeModule } from './raz-progress-campaign-home/raz-progress-campaign-home.module';
import { PageComponentsModule } from './page-components/page-components.module';
import { RazProgressCampaignModule } from './raz-progress-campaign/raz-progress-campaign.module';
import { RewardVoucherDetailModule } from './reward-voucher-detail/reward-voucher-detail.module';
import { RazAdaptedCampaignsCollectionModule } from './raz-adapted-campaigns-collection/raz-adapted-campaigns-collection.module';
import { FilterDialogComponent } from './nearme/filter-dialog/filter-dialog.component';
import { QuestModule } from './quest/quest.module';
import { LargeVouchersModule } from './large-vouchers/large-vouchers.module';
import { PrizeSetOutcomeModule } from './prize-set-outcome/prize-set-outcome.module';
import { InstantRewardOutcomeModule } from './instant-reward-outcome/instant-reward-outcome.module';
import { BadgeModule } from './badges/badge.module';

const comps: any[] = [
  RewardComponent,
  LoadingComponent,
  SignInComponent,
  SurveyComponent,
  TransactionHistoryComponent,
  ChangePasswordComponent,
  RewardsBookingComponent,
  LuckyDrawDetailsComponent,
  LeaderboardPageComponent,
  LeaderboardsComponent,
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
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgxBarcode6Module,
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
    RazProgressCampaignHomeModule,
    PageComponentsModule,
    RazProgressCampaignModule,
    RewardVoucherDetailModule,
    ProgressBarModule,
    RazAdaptedCampaignsCollectionModule,
    QuestModule,
    LargeVouchersModule,
    PrizeSetOutcomeModule,
    InstantRewardOutcomeModule,
    BadgeModule
  ],
  entryComponents: [FilterDialogComponent],
  exports: [...comps],
  declarations: [...comps],
  providers: [SecondsToStringPipe],
})
export class PerxBlackcombPagesModule { }
