import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IQuestion, IAnswer, IPoints, ITracker } from './../../models/survey.model';

interface IPayloadGroup {
  type: string;
  questions: IQuestion[];
}
@Component({
  selector: 'perx-core-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnChanges {
  @Input()
  public payload: IPayloadGroup;

  @Input()
  public id: number;

  @Input()
  public questionPointer: number;

  @Input()
  public totalQuestions: number;

  @Input()
  public flush: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateFlushEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public selectedChoice: number;

  public pointsTracker: ITracker = {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush) {
      this.flush = changes.flush.currentValue;
    }
  }

  public updateAnswer(answer: IAnswer): void {
    this.updateAnswers.emit(answer);
  }

  public updatePoint(point: IPoints): void {
    this.pointsTracker[point.question_id] = point.point;
    const currentPoint = this.calculatePoints();
    if (this.allAnswersEmitted()) {
      this.updateFlushEmit.emit(false);
    }
    this.updatePoints.emit(currentPoint);
  }

  public calculatePoints(): number {
    const pointsTrackerValues = Object.values(this.pointsTracker);
    const subQuestionLength = this.payload.questions.length;
    const totalPoint = pointsTrackerValues.reduce((previous, value) => {
      return previous + value;
    }, 0);
    return totalPoint / subQuestionLength;
  }

  public allAnswersEmitted(): boolean {
    const pointsTrackerValues = Object.values(this.pointsTracker);
    const subQuestionLength = this.payload.questions.length;
    return pointsTrackerValues.length === subQuestionLength;
  }

  public updateFlush(finish: boolean): void {
    if (this.allAnswersEmitted()) {
      this.updateFlushEmit.emit(finish);
    }
  }
}
