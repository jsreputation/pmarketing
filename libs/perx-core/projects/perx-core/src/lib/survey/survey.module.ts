import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvConfig } from '../shared/env-config';
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

const components = [
];
const directives = [
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    SurveyComponent,
    QuestionComponent,
    RatingComponent,
    PictureSelectComponent,
    LongTextComponent,
    SelectComponent,
    GroupComponent,
    DateComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...components,
    ...directives
  ]
})
export class SurveyModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: SurveyModule,
      providers: [
        SurveyService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
