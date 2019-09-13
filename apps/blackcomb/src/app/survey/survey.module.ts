import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyModule as PerxSurveyModule, CampaignModule as PerxCampaignModule, ConfigModule, AuthenticationModule } from '@perx/core';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';
import { MatCardModule, MatButtonModule, MatProgressBarModule, MatDatepickerModule, MatRadioModule, MatCheckboxModule } from '@angular/material';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [SurveyComponent],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    SurveyRoutingModule,
    PerxCampaignModule,
    PerxSurveyModule,
    AuthenticationModule
  ]
})
export class SurveyModule { }
