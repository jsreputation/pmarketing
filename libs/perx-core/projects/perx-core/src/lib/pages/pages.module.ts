import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GameComponent } from './game/game.component';
import { ShakeComponent } from './game/shake/shake.component';
import { TapComponent } from './game/tap/tap.component';
import { HistoryComponent } from './history/history.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule } from '@angular/material';
import { GameModule } from '../game/game.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { HomeComponent } from './home/home.component';
import { RewardPageComponent } from './reward-page/reward-page.component';
import { RewardsModule } from '../rewards/rewards.module';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { RedeemComponent } from './redeem/redeem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RewardDetailPageComponent } from './reward-detail-page/reward-detail-page.component';
import { StampCardComponent } from './stamp-card/stamp-card.component';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { PuzzlesModule } from '../puzzles/puzzles.module';
import { SurveyModule } from '../survey/survey.module';

export const components = [
    AccountComponent,
    ContactUsComponent,
    GameComponent,
    ShakeComponent,
    TapComponent,
    HistoryComponent,
    HomeComponent,
    RewardPageComponent,
    LoadingComponent,
    LoginComponent,
    RedeemComponent,
    RewardDetailPageComponent
];

@NgModule({
    declarations: [...components, StampCardComponent, SurveyPageComponent],
    exports: [...components],
    imports: [
        RouterModule,
        CommonModule,
        MatProgressBarModule,
        GameModule,
        VouchersModule,
        MatCardModule,
        RewardsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        PuzzlesModule,
        SurveyModule
    ]
})
export class PagesModule { }
