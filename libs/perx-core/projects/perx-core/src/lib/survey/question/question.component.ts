import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion, SurveyQuestionType } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: IQuestion;

  @Output()
  public updateAnswers: EventEmitter<string | number> = new EventEmitter<string | number>();

  @Output()
  public updatePoints: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  public ngOnInit(): void {
  }

  public updateAnswer(answer: string | number): void {
    this.updateAnswers.emit(answer);
    if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
      const point = this.question.required ? (answer ? 1 : 0) : 1;
      this.updatePoints.emit(point);
    }
  }

  public updatePoint(point: number): void {
    this.updatePoints.emit(point);
  }
}
