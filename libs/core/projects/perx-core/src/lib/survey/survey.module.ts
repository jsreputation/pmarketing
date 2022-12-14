import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import { MatButtonModule, } from '@angular/material/button';
import { MatIconModule, } from '@angular/material/icon';
import { MatRippleModule, } from '@angular/material/core';
import { MatSelectModule, } from '@angular/material/select';
import { MatCheckboxModule, } from '@angular/material/checkbox';
import { MatRadioModule, } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { PasswordComponent } from './question/password/password.component';
import { MatListModule } from '@angular/material/list';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { V4SurveyService } from './v4-survey.service';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { SurveySelectComponent } from './formly-question/select/select.component';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { SurveyPictureSelectComponent } from './formly-question/picture-select/pic-select.component';
import { FormlyFieldStepperComponent } from './formly-stepper/formly-stepper';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';

export function surveyServiceFactory(http: HttpClient, config: ConfigService): SurveyService {
  // Make decision on what to instantiate base on config
  return new V4SurveyService(http, config);
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
  FormlyFieldStepperComponent,
  SurveySelectComponent,
  SurveyPictureSelectComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatRippleModule,
    MatStepperModule,
    FormlyModule.forRoot({
      validators: [],
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required.'
        }
      ],
      types: [
        {
          name: 'stepper',
          component: FormlyFieldStepperComponent
        },
        {
          name: 'survey-select',
          component: SurveySelectComponent
        },
        {
          name: 'pic-survey-select',
          component: SurveyPictureSelectComponent
        }
      ]
    }),
    FormlyMaterialModule,
    FormlySelectModule,
    MatProgressBarModule,
    PinchZoomModule
  ],
  providers: [
    {
      provide: SurveyService,
      useFactory: surveyServiceFactory,
      deps: [HttpClient, ConfigService]
    },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {
        useUtc: true,
        strict: true
      }
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  exports: [
    ...components
  ]
})
export class SurveyModule {
}
