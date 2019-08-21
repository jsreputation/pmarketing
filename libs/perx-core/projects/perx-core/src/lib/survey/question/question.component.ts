import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer, IPoints } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input()
  public question: IQuestion;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<IPoints> = new EventEmitter<IPoints>();

  public get surveyQuestionType(): typeof SurveyQuestionType { return SurveyQuestionType; }

  public updateAnswer(answer: string | number | boolean): void {
    this.updateAnswers.emit({ question_id: this.question.id, content: answer });
    if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
      const point = this.question.required ? (answer ? 1 : 0) : 1;
      this.updatePoints.emit({ question_id: this.question.id, point });
    }
  }

  public updatePoint(point: number): void {
    this.updatePoints.emit({ question_id: this.question.id, point });
  }
}
