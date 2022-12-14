import {Component, Input, Output, EventEmitter, Optional} from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer, IPoints, IErrors } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input()
  public id: number;

  @Input()
  public hideIndex: boolean = false;

  @Input()
  public questionPointer: number;

  @Input()
  public totalQuestions: number;

  @Input()
  public question: IQuestion;

  @Input() @Optional()
  public alpha: string;

  @Input()
  public isSubQuestion: boolean;

  // Used to flush group tree is passed into each question component if used
  // @Input()
  // public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<IPoints> = new EventEmitter<IPoints>();

  @Output()
  public updateQuestionPointer: EventEmitter<string> = new EventEmitter<string>();

  public errorState: IErrors = {};

  public point: number;

  public get surveyQuestionType(): typeof SurveyQuestionType { return SurveyQuestionType; }

  public get isActive(): boolean {
    return this.questionPointer === this.id;
  }

  public updateAnswer(answer: IAnswer): void {
    this.question.answer = answer.content.toString();
    const questionId = answer.questionId ? answer.questionId : this.question.id;
    this.updateAnswers.emit({ questionId: questionId || 'sign-in', content: answer.content.toString() });
    this.updateNonGroupPoint();
    this.questionValidation();
  }

  public updateNonGroupPoint(): void {
    // if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
    this.point = this.question && this.question.required ?
      (this.question.answer === 0 || (this.question.answer && this.question.answer.length > 0) ? 1 : 0) : 1;
    // }
    this.updatePoints.emit({ questionId: this.question.id, point: this.point });
  }

  public validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public questionValidation(): void {
    this.errorState = {};
    if (this.question && this.question.required && this.point !== 1) {
      this.errorState.isRequired = true;
      this.errorState.hasError = true;
    } else if (
      this.question.payload['max-length']
      && typeof this.question.answer === 'string'
      && this.question.payload['max-length'] < this.question.answer.length
    ) {
      this.errorState.exceedMaxLength = true;
      this.errorState.hasError = true;
    } else if (this.question.id === 'email_address' && !this.validateEmail(this.question.answer)) {
      this.errorState.inValidEmail = true;
    }
  }
}


// note: because next is handled now by parent it needs to be bought up

// public next(): void {
//   this.questionValidation();
//   if (!this.errorState.hasError) {
//     this.moveToNextQuestion();
//   } else if (this.question.payload.type === SurveyQuestionType.questionGroup) {
//     this.flush = !this.flush;
//   }
// }

// public moveToNextQuestion(): void {
//   this.updateNonGroupPoint();
//   this.updateQuestionPointer.emit('next');
// }
//
// public back(): void {
//   this.updateQuestionPointer.emit('back');
// }

// public updateGroupPoint(point: number): void {
//   this.point = point;
//   this.updatePoints.emit({ questionId: this.question.id, point });
// }

// public ngOnChanges(changes: SimpleChanges): void {
// if (changes.flush) {
//   this.flush = changes.flush.currentValue;
//   if (this.flush) {
//     this.questionValidation();
//   }
// }
// }
