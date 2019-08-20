import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvConfig } from '../shared/env-config';
import { SurveyService } from './survey.service';
import { SurveyComponent } from './survey/survey.component';

const components = [
];
const directives = [
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
        SurveyService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
