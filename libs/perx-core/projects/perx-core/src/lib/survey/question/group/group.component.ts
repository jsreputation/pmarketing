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
  public flushValidation: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<string | number | boolean> = new EventEmitter<string | number | boolean>();

  @Output()
  public updatePoints: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateFlushValidationEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public selectedChoice: number;

  public pointsTracker: ITracker = {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flushValidation) {
      this.flushValidation = changes.flushValidation.currentValue;
    }
  }

  public updateAnswer(answer: IAnswer): void {
    this.updateAnswers.emit(answer.content);
  }

  public updatePoint(point: IPoints): void {
    this.pointsTracker[point.question_id] = point.point;
    const currentPoint = this.calculatePoints();
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

  public updateFlushValidation(finish: boolean): void {
    this.flushValidation = finish;
    const pointsTrackerValues = Object.values(this.pointsTracker);
    const subQuestionLength = this.payload.questions.length;
    if (pointsTrackerValues.length === subQuestionLength) {
      this.updateFlushValidationEmit.emit(finish);
    }
  }
}
