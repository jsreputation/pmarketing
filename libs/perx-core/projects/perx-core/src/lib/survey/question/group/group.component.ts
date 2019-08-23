import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IQuestion, IAnswer, ITracker } from './../../models/survey.model';

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
  public flushTrigger: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public selectedChoice: number;

  public answersTracker: ITracker = {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flushTrigger && changes.flushTrigger.currentValue !== undefined) {
      this.flushTrigger = changes.flushTrigger.currentValue;
    }
  }

  public updateAnswer(answer: IAnswer): void {
    if (this.isNextLevelQuestion(answer)) {
      this.answersTracker[answer.question_id] = Object.assign( {}, answer);
      const currentPoint = this.calculatePoints();
      answer.point = currentPoint;
    }
    this.updateAnswers.emit(answer);
  }

  public calculatePoints(): number {
    const answersTrackerValues = Object.values(this.answersTracker);
    const subQuestionLength = this.payload.questions.length;
    const totalPoint = answersTrackerValues.reduce((sum, answer) => {
      return sum + answer.point;
    }, 0);
    return totalPoint / subQuestionLength;
  }

  public isNextLevelQuestion(answer: IAnswer): boolean {
    return this.payload.questions.some((question: IQuestion) => {
      return question.id === answer.question_id;
    });
  }
}
