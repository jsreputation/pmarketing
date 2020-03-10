import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { IAnswer, ISurvey, ITracker, IPoints } from '../models/survey.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnChanges, OnDestroy {
  @Input('data')
  public data$: Observable<ISurvey>;

  @Input()
  public hideIndex: boolean = false;

  @Input()
  public questionPointer: number = 0;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter(false);

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  @ViewChildren('questionsList') public questionComponents: QueryList<QuestionComponent>;

  public answersTracker: ITracker = {};

  public pointsTracker: ITracker = {};

  public data: ISurvey;

  public viewChecked: boolean = false;

  private destroy$: Subject<any> = new Subject();

  public ngOnChanges(changes: SimpleChanges): void {
    const questionPointerChange = changes.questionPointer;
    if (questionPointerChange && this.questionComponents) {
      // emitting helps to update calling setCurrentPointer on parentElement
      // signal has been called with answer alrdy
      this.currentPointer.emit(questionPointerChange.currentValue);
    }
  }

  public ngOnInit(): void {
    if (this.data$) {
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

  public updateAnswers(answer: IAnswer): void {
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
    const answers: IAnswer[] = Object.entries(this.answersTracker).map(([id, answer]) => ({
      questionId: id,
      content: answer.content
    }));
    this.surveyDone.emit(answers);
    // }
  }

  public calculatePoints(): number {
    return Object.values(this.pointsTracker).reduce((sum, point) => sum + point, 0);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
