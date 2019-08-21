import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer, ISurvey, IPoints, ITracker } from '../models/survey.model';
@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input()
  public data: ISurvey;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  public pointsTracker: ITracker = {};

  public answersTracker: ITracker = {};

  constructor() { }

  public ngOnInit(): void {

  }

  public completeSurvey(): void {
    this.surveyDone.emit();
  }

  public updateAnswers(answer: IAnswer): void {
    this.answersTracker[`answer.question_id`] = answer.content;
  }

  public updatePoints(points: IPoints): void {
    this.pointsTracker[`points.question_id`] = points.point;
    this.updateParent();
  }

  public updateParent(): void {
    const currentPoint = this.calculatePoints();
    const totalQuestion = this.data.questions.length;
    this.totalLength.emit(totalQuestion);
    this.currentPointer.emit(currentPoint);
    if (currentPoint >= totalQuestion) {
      const answers = Object.entries(this.answersTracker).map(([id, answer]) => {
        return {
          question_id: id,
          content: answer
        };
      });
      this.surveyDone.emit(answers);
    }
  }
  public calculatePoints(): number {
    return Object.values(this.pointsTracker).reduce((previous, value) => {
      return previous + value;
    }, 0);
  }
}
