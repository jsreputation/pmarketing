import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPoints, IQAnswer, IQuiz, ITracker } from '../models/quiz.model';
import { QuizQuestionComponent } from '../question/question.component';

@Component({
  selector: 'perx-core-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnChanges, OnDestroy {
  @Input('data')
  public data$: Observable<IQuiz>;

  @Input()
  public hideIndex: boolean = false;

  @Input()
  public questionPointer: number = 0;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public answers: EventEmitter<ITracker<IQAnswer>> = new EventEmitter();

  @Output()
  public done: EventEmitter<ITracker<IQAnswer>> = new EventEmitter();

  @ViewChildren('questionsList') public questionComponents: QueryList<QuizQuestionComponent>;

  private answersTracker: ITracker<IQAnswer> = {};

  private pointsTracker: ITracker<number> = {};

  public data: IQuiz;

  private destroy$: Subject<void> = new Subject();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data$ && this.data$) {
      this.data$
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.data = data;
          if (this.data) {
            this.totalLength.emit(this.data.questions.length);
          }
        });
    }
  }

  public updateAnswers(answer: IQAnswer): void {
    this.answersTracker[answer.questionId] = answer;
    this.answers.emit(this.answersTracker);
    // console.log('validation', this.questionComponents.map(qc => qc.questionValidation()));
    const done: boolean = !this.questionComponents.some((qc: QuizQuestionComponent) => !qc.questionValidation());
    // console.log('done?', done);
    if (done) {
      this.done.emit(this.answersTracker);
    }
  }

  public updatePoints(points: IPoints): void {
    this.pointsTracker[points.questionId] = points.point;
  }

  // private get totalPoints(): number {
  //   // different way of calculating points, factoring in time taken
  //   return Object.values(this.pointsTracker).reduce((sum, point) => sum + point, 0);
  // }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
