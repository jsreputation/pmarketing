import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {
  GameModule,
  VouchersModule,
  RewardsModule,
  PuzzlesModule,
  SurveyModule
} from '@perx/core';
import {
  AccountComponent,
  GameComponent,
  ShakeComponent,
  TapComponent,
  HistoryComponent,
  ContentComponent,
  HomeComponent,
  RewardComponent,
  LoadingComponent,
  LoginComponent,
  RedeemComponent,
  RewardDetailsComponent,
  StampCardComponent,
  SurveyComponent,
  VoucherDetailComponent
} from '@perx/blackcomb-pages';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    AccountComponent,
    GameComponent,
    ShakeComponent,
    TapComponent,
    HistoryComponent,
    ContentComponent,
    HomeComponent,
    RewardComponent,
    LoadingComponent,
    LoginComponent,
    RedeemComponent,
    RewardDetailsComponent,
    StampCardComponent,
    SurveyComponent,
    VoucherDetailComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    GameModule,
    VouchersModule,
    MatCardModule,
    RewardsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    PuzzlesModule,
    SurveyModule
  ]
})
export class PagesModule { }
