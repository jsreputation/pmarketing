import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { IAnswer, ISurvey, ITracker, IPoints } from '../models/survey.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Input('data')
  public data$: Observable<ISurvey>;

  @Input()
  public hideIndex: boolean = false;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  public answersTracker: ITracker = {};

  public pointsTracker: ITracker = {};

  public data: ISurvey;

  public questionPointer: number = 0;

  private destroy$: Subject<any> = new Subject();

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
    if (currentPoint >= totalQuestion) {
      const answers: IAnswer[] = Object.entries(this.answersTracker).map(([id, answer]) => ({
        questionId: id,
        content: answer.content
      }));
      this.surveyDone.emit(answers);
    }
  }

  public updateQuestionPointer(action: string): void {
    if (action === 'next') {
      this.questionPointer++;
    } else {
      this.questionPointer--;
    }
  }

  public calculatePoints(): number {
    return Object.values(this.pointsTracker).reduce((sum, point) => sum + point, 0);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
