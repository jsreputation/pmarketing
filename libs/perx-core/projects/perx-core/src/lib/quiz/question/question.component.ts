import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { IErrors, IPoints, IQAnswer, IQQuestion, QuizQuestionType } from '../models/quiz.model';

@Component({
  selector: 'perx-core-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuizQuestionComponent {
  @Input()
  public id: number;

  @Input()
  public hideIndex: boolean = false;

  @Input()
  public question: IQQuestion;

  @Input() @Optional()
  public alpha: string;

  @Input()
  public isSubQuestion: boolean;

  @Output()
  public updateAnswers: EventEmitter<IQAnswer> = new EventEmitter<IQAnswer>();

  @Output()
  public updatePoints: EventEmitter<IPoints> = new EventEmitter<IPoints>();

  // @Output()
  // public updateQuestionPointer: EventEmitter<string> = new EventEmitter<string>();

  public errorState: IErrors = {};

  public point: number;

  public get quizQuestionType(): typeof QuizQuestionType { return QuizQuestionType; }

  public updateAnswer(content: (string | number)[]): void {
    this.question.answer = content.toString();
    const questionId = this.question.id;
    this.updateNonGroupPoint();
    this.updateAnswers.emit({ questionId, content });
    this.questionValidation();
  }

  public updateNonGroupPoint(): void {
    // if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
    this.point = this.question && this.question.required ?
      (this.question.answer === 0 || (this.question.answer && this.question.answer.length > 0) ? 1 : 0) : 1;
    // }
    this.updatePoints.emit({ questionId: this.question.id, points: this.point, question: this.question.question });
  }

  public questionValidation(): boolean {
    this.errorState = {};
    if (this.question && this.question.required && this.point !== 1) {
      this.errorState.isRequired = true;
      this.errorState.hasError = true;
      return false;
    }
    if (
      this.question.payload['max-length']
      && typeof this.question.answer === 'string'
      && this.question.payload['max-length'] < this.question.answer.length
    ) {
      this.errorState.exceedMaxLength = true;
      this.errorState.hasError = true;
      return false;
    }
    if (this.question.id === 'email_address' && !this.validateEmail(this.question.answer)) {
      this.errorState.isInvalidEmail = true;
      return false;
    }
    return true;
  }

  private validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
