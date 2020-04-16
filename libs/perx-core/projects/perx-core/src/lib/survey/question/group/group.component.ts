import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IAnswer, IPoints, IQuestion, ITracker, SurveyQuestionType } from '../../models/survey.model';

export interface IGroupPayload {
  type: SurveyQuestionType.questionGroup;
  questions: IQuestion[];
}

@Component({
  selector: 'perx-core-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnChanges {
  @Input()
  public hideIndex: boolean = false;

  @Input()
  public id: number;

  @Input()
  public questionPointer: number;

  @Input()
  public payload: IGroupPayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<number> = new EventEmitter<number>();

  public selectedChoice: number;

  public answersTracker: ITracker = {};

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
    if (point.questionId) {
      this.pointsTracker[point.questionId] = point.point;
      const currentPoint = this.calculatePoints();
      this.updatePoints.emit(currentPoint);
    }
  }

  public calculatePoints(): number {
    if (!this.payload) {
      return 0;
    }
    const pointsTrackerValues = Object.values(this.pointsTracker);
    const subQuestionLength = this.payload.questions.length;
    const totalPoint = pointsTrackerValues.reduce((sum, point) => sum + point, 0);
    return totalPoint / subQuestionLength;
  }

  public getCharCode(i: number): string {
    return String.fromCharCode(97 + i);
  }

}
