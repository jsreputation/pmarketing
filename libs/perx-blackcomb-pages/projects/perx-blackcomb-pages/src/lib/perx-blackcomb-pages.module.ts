import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentComponent } from './content/content.component';
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
  MatDialogModule
} from '@angular/material';
import { GameModule } from './game/game.module';
import { HistoryComponent } from './history/history.component';
import {
  RepeatTimesDirective,
  SortRewardsPipe,
  RewardsCollectionComponent,
  VouchersComponent,
  PinRedemptionComponent,
  BcodeRedemptionComponent,
  QrcodeRedemptionComponent,
  BarcodeRedemptionComponent,
  RewardComponent as PerxRewardComponent,
  SurveyComponent as PerxSurveyComponent,
  PuzzleCollectStampsComponent,
  QuestionComponent,
  SelectComponent,
  PhoneComponent,
  GroupComponent,
  RatingComponent,
  PictureSelectComponent,
  LongTextComponent,
  DateComponent,
  VoucherComponent,
  RewardsListTabbedComponent,
  RewardsListComponent,
  LoyaltySummaryComponent,
  LoyaltyTransactionsListComponent,
  NewsfeedComponent,
  PinInputComponent,
  PasswordComponent,
  PuzzleListComponent
} from '@perx/core';

import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { SignIn2Component } from './sign-in-2/sign-in-2.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { QRComponent } from './qr/qr.component';
import { RedeemComponent } from './redeem/redeem.component';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { StampCardComponent } from './stamp-card/stamp-card.component';
import { SurveyComponent } from './survey/survey.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { WalletComponent } from './wallet/wallet.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { GamesCollectionComponent } from './home/games-collection/games-collection.component';
import { CampaignsCollectionComponent } from './home/campaigns-collection/campaigns-collection.component';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { RewardsBookingComponent } from './rewards-booking/rewards-booking.component';
import { ProfileBarcodeComponent } from './profile-barcode/profile-barcode.component';
import { EditProfileFieldComponent } from './edit-profile-field/edit-profile-field.component';
import { CampaignStampsComponent } from './campaign-stamps/campaign-stamps.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { CatalogRewardCardComponent } from './catalog-reward-card/catalog-reward-card.component';
import {CatalogComponent} from './catalog/catalog.component';

const comps: any[] = [
  AccountComponent,
  ContentComponent,
  HistoryComponent,
  VouchersComponent,
  SignUpComponent,
  RepeatTimesDirective,
  RewardsCollectionComponent,
  RewardComponent,
  PinRedemptionComponent,
  BcodeRedemptionComponent,
  QrcodeRedemptionComponent,
  BarcodeRedemptionComponent,
  LoadingComponent,
  RedeemComponent,
  SignIn2Component,
  SignInComponent,
  QRComponent,
  RewardDetailsComponent,
  PerxRewardComponent,
  StampCardComponent,
  SurveyComponent,
  PerxSurveyComponent,
  PuzzleCollectStampsComponent,
  QuestionComponent,
  SelectComponent,
  PhoneComponent,
  GroupComponent,
  RatingComponent,
  PasswordComponent,
  PictureSelectComponent,
  LongTextComponent,
  DateComponent,
  VoucherDetailComponent,
  VoucherComponent,
  WalletComponent,
  RewardsListTabbedComponent,
  LoyaltySummaryComponent,
  LoyaltyTransactionsListComponent,
  RewardsListComponent,
  LayoutComponent,
  HomeComponent,
  GamesCollectionComponent,
  CampaignsCollectionComponent,
  NewsfeedComponent,
  WalletHistoryComponent,
  TransactionHistoryComponent,
  ProfileComponent,
  ChangePasswordComponent,
  EnterPinComponent,
  PinInputComponent,
  RewardsBookingComponent,
  ProfileBarcodeComponent,
  EditProfileFieldComponent,
  PuzzleListComponent,
  CampaignStampsComponent,
  CatalogComponent,
  CatalogsComponent,
  CatalogRewardCardComponent,
  SortRewardsPipe
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    GameModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
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
    MatListModule,
    InfiniteScrollModule,
    MatDialogModule
  ],
  exports: [
    ...comps,
  ],
  declarations: [
    ...comps,
  ]
})
export class PerxBlackcombPagesModule {

}
