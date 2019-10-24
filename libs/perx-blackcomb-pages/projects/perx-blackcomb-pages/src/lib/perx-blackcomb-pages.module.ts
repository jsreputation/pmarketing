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
  LoyaltySummaryComponent
} from '@perx/core';

import { HomeComponent } from './home/home.component';
import { RewardComponent } from './reward/reward.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { LoginComponent } from './login/login.component';
import { QRComponent } from './qr/qr.component';
import { RedeemComponent } from './redeem/redeem.component';
import { RewardDetailsComponent } from './reward-details/reward-details.component';
import { StampCardComponent } from './stamp-card/stamp-card.component';
import { SurveyComponent } from './survey/survey.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { WalletComponent } from './wallet/wallet.component';
import { GamesCollectionComponent } from './home/games-collection/games-collection.component';
import { TranslateModule } from '@ngx-translate/core';
const comps: any[] = [
  AccountComponent,
  ContentComponent,
  HistoryComponent,
  VouchersComponent,
  RepeatTimesDirective,
  RewardsCollectionComponent,
  HomeComponent,
  RewardComponent,
  PinRedemptionComponent,
  BcodeRedemptionComponent,
  QrcodeRedemptionComponent,
  LoadingComponent,
  RedeemComponent,
  LoginComponent,
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
  GamesCollectionComponent,
  RewardsListComponent
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
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    TranslateModule.forChild()
  ],
  exports: [
    ...comps
  ],
  declarations: [
    ...comps
  ]
})
export class PerxBlackcombPagesModule {

}
