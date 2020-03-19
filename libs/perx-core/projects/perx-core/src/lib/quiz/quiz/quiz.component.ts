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
  public currentPointer: EventEmitter<number> = new EventEmitter(false);

  @Output()
  public quizDone: EventEmitter<IQAnswer[]> = new EventEmitter();

  @ViewChildren('questionsList') public questionComponents: QueryList<QuizQuestionComponent>;

  public answersTracker: ITracker = {};

  public pointsTracker: ITracker = {};

  public data: IQuiz;

  public viewChecked: boolean = false;

  private destroy$: Subject<void> = new Subject();

  public ngOnChanges(changes: SimpleChanges): void {
    const questionPointerChange = changes.questionPointer;
    if (questionPointerChange && this.questionComponents) {
      // emitting helps to update calling setCurrentPointer on parentElement
      // signal has been called with answer alrdy
      this.currentPointer.emit(questionPointerChange.currentValue);
    }
    if (changes.data$ && this.data$) {
      this.data$
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.data = data;
          if (this.data) {
            this.totalLength.emit(this.data.questions.length);
            this.currentPointer.emit(0);
          }
        });
    }
  }

  public updateAnswers(answer: IQAnswer): void {
    if (answer.questionId) {
      this.answersTracker[answer.questionId] = answer;
    }
  }

  public updatePoints(points: IPoints): void {
    if (points.questionId) {
      this.pointsTracker[points.questionId] = points.point;
      this.updateParent();
    }
  }

  public updateParent(): void {
    const currentPoint = this.calculatePoints();
    const totalQuestion = this.data && this.data.questions.length;
    if (this.data) {
      this.totalLength.emit(totalQuestion);
      this.currentPointer.emit(currentPoint);
    }
    // to keep track of questions answered state, update after each question answered / updated
    // OLD: if (currentPoint >= totalQuestion) {
    const answers: IQAnswer[] = Object.entries(this.answersTracker).map(([id, answer]) => ({
      questionId: id,
      content: answer.content
    }));
    this.quizDone.emit(answers);
    // }
  }

  public calculatePoints(): number {
    // different way of calculating points, factoring in time taken
    return Object.values(this.pointsTracker).reduce((sum, point) => sum + point, 0);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
