import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import { MatButtonModule, } from '@angular/material/button';
import { MatIconModule, } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule, } from '@angular/material/core';
import { MatSelectModule, } from '@angular/material/select';
import { MatCheckboxModule, } from '@angular/material/checkbox';
import { MatRadioModule, } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { SwipeListComponent } from './question/swipe-list/swipe-list.component';
import { SwipeItemComponent } from './question/swipe-list/swipe-item/swipe-item.component';
import { MatListModule } from '@angular/material/list';

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
  PasswordComponent,
  SwipeListComponent,
  SwipeItemComponent
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
    MatRadioModule,
    MatListModule,
    MatRippleModule
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
