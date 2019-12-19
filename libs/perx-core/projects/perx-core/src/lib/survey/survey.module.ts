import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyService } from './survey.service';
import { SurveyComponent } from './survey/survey.component';
import { QuestionComponent } from './question/question.component';
import { RatingComponent } from './question/rating/rating.component';
import { PictureSelectComponent } from './question/picture-select/picture-select.component';
import { LongTextComponent } from './question/long-text/long-text.component';
import { SelectComponent } from './question/select/select.component';
import { GroupComponent } from './question/group/group.component';
import { DateComponent } from './question/date/date.component';
import { PhoneComponent } from './question/phone/phone.component';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ICampaignService } from '../campaign/icampaign.service';
import { PasswordComponent } from './question/password/password.component';

export function surveyServiceFactory(http: HttpClient, campaignService: ICampaignService, config: Config): SurveyService {
  // Make decision on what to instantiate base on config
  return new SurveyService(http, campaignService, config);
}

const components = [
  SurveyComponent,
  QuestionComponent,
  RatingComponent,
  PictureSelectComponent,
  LongTextComponent,
  SelectComponent,
  GroupComponent,
  DateComponent,
  PhoneComponent,
  PasswordComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: SurveyService,
      useFactory: surveyServiceFactory,
      deps: [HttpClient, ICampaignService, Config]
    }
  ],
  exports: [
    ...components
  ]
})
export class SurveyModule {
}
