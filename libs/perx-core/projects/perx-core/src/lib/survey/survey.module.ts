import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { SelectionValidatorDirective } from './selection/selection.directive';
import {
  SelectionComponent,
  SelectionGroupDirective,
  SelectionWrapperComponent
} from './selection/selection.component';
import { EnvConfig } from '../shared/env-config';
import { SurveyService } from './survey.service';
import { V4SurveyService } from './v4-survey.service';
import { SurveyComponent } from './survey/survey.component';

const components = [
  RatingComponent,
  SelectionComponent,
  SelectionWrapperComponent,
];
const directives = [
  SelectionGroupDirective,
  SelectionValidatorDirective
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    SurveyComponent
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
        {
          provide: SurveyService,
          useValue: V4SurveyService
        },
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
