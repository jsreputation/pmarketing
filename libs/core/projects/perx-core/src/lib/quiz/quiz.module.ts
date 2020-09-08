import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ConfigService } from '../config/config.service';
import { QuizLongTextComponent } from './question/long-text/long-text.component';
import { QuizPictureSelectComponent } from './question/picture-select/picture-select.component';
import { QuizQuestionComponent } from './question/question.component';
import { QuizRatingComponent } from './question/rating/rating.component';
import { QuizSelectComponent } from './question/select/select.component';
import { QuizSwipeListComponent } from './question/swipe-list/swipe-list.component';
import { QuizService } from './quiz.service';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { SecondsToStringPipe } from './seconds-to-string.pipe';
import { V4QuizService } from './v4-quiz.service';
import { PinchZoomModule } from 'ngx-pinch-zoom';

export function quizServiceFactory(http: HttpClient, config: ConfigService): QuizService {
  // Make decision on what to instantiate base on config
  return new V4QuizService(http, config);
}

const componentsAndPipes = [
  QuizComponent,
  QuizQuestionComponent,
  QuizRatingComponent,
  QuizPictureSelectComponent,
  QuizLongTextComponent,
  QuizSelectComponent,
  QuizSwipeListComponent,
  ResultsComponent,
  SecondsToStringPipe,
];

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  public overrides: any = {
    pan: {
      touchAction: 'auto',
      direction: 6
    },
    pinch: {
      enable: false
    },
    rotate: {
      enable: false
    },
    swipe: {
      enable: false
    }
  };
}

@NgModule({
  declarations: [...componentsAndPipes],
  exports: [...componentsAndPipes],
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
    PinchZoomModule
  ],
  providers: [
    {
      provide: QuizService,
      useFactory: quizServiceFactory,
      deps: [HttpClient, ConfigService]
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    SecondsToStringPipe
  ]
})
export class QuizModule {
}
