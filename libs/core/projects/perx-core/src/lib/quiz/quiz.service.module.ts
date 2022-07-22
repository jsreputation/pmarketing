import {ModuleWithProviders, NgModule} from '@angular/core';
import { QuizService } from './quiz.service';
import { V4QuizService } from './v4-quiz.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

export function quizServiceFactory(http: HttpClient, config: ConfigService): QuizService {
  // Make decision on what to instantiate base on config
  return new V4QuizService(http, config);
}

@NgModule({})
export class QuizServiceModule {
  public static forRoot(): ModuleWithProviders<QuizServiceModule> {
    return {
      ngModule: QuizServiceModule,
      providers: [
        {
          provide: QuizService,
          useFactory: quizServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<QuizServiceModule> {
    return {
      ngModule: QuizServiceModule
    };
  }
}
