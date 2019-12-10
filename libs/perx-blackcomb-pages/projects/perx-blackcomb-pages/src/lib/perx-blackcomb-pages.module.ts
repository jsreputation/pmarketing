import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
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
  MatListModule
} from '@angular/material';
import { GameModule } from './game/game.module';
import { HistoryComponent } from './history/history.component';
import {
  RepeatTimesDirective,
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
  PinInputComponent
} from '@perx/core';

import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LoginComponent } from './login/login.component';
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
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { ProfileComponent } from './profile/profile.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { FeedItemPopupComponent } from './feed-item-popup/feed-item-popup.component';

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
  LoginComponent,
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
  NewsfeedComponent,
  WalletHistoryComponent,
  TransactionHistoryComponent,
  ProfileComponent,
  ChangePasswordComponent,
  EnterPinComponent,
  PinInputComponent,
  FeedItemPopupComponent
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
    MatListModule
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
