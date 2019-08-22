import { IQuestion, IAnswer, IPoints, ITracker } from './../../models/survey.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface IPayloadGroup {
  type: string;
  questions: IQuestion[];
}
@Component({
  selector: 'perx-core-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent {
  @Input()
  public payload: IPayloadGroup;

  @Input()
  public id: number;

  @Input()
  public questionPointer: number;

  @Input()
  public totalQuestions: number;

  @Output()
  public updateAnswers: EventEmitter<string | number | boolean> = new EventEmitter<string | number | boolean>();

  @Output()
  public updatePoints: EventEmitter<number> = new EventEmitter<number>();

  public selectedChoice: number;
  public pointsTracker: ITracker = {};

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
}
