import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer, IPoints, IErrors } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {

  @Input()
  public id: number;

  @Input()
  public questionPointer: number;

  @Input()
  public totalQuestions: number;

  @Input()
  public question: IQuestion;

  @Input()
  public isSubQuestion: boolean;

  // Used to flush group tree
  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<IPoints> = new EventEmitter<IPoints>();

  @Output()
  public updateQuestionPointer: EventEmitter<string> = new EventEmitter<string>();

  public errorState: IErrors = {};

  public point: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush) {
      this.flush = changes.flush.currentValue;
      if (this.flush) {
        this.questionValidation();
      }
    }
  }

  public get surveyQuestionType(): typeof SurveyQuestionType { return SurveyQuestionType; }

  public get isActive(): boolean {
    return this.questionPointer === this.id;
  }

  public updateAnswer(answer: IAnswer): void {
    this.question.answer = String(answer.content);
    const questionId = answer.question_id ? answer.question_id : this.question.id;
    this.updateAnswers.emit({ question_id: questionId, content: answer.content });
    this.updateNonGroupPoint();
    this.questionValidation();
  }

  public updateGroupPoint(point: number): void {
    this.point = point;
    this.updatePoints.emit({ question_id: this.question.id, point });
  }

  public updateNonGroupPoint(): void {
    if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
      this.point = this.question && this.question.required ?
        (this.question.answer === 0 || (this.question.answer && this.question.answer.length > 0) ? 1 : 0) : 1;
      this.updatePoints.emit({ question_id: this.question.id, point: this.point });
    }
  }

  public next(): void {
    this.questionValidation();
    if (!this.errorState.hasError) {
      this.moveToNextQuestion();
    } else if (this.question.payload.type === SurveyQuestionType.questionGroup) {
      this.flush = !this.flush;
    }
  }

  public moveToNextQuestion(): void {
    this.updateNonGroupPoint();
    this.updateQuestionPointer.emit('next');
  }

  public back(): void {
    this.updateQuestionPointer.emit('back');
  }

  public questionValidation(): void {
    this.errorState = {};
    if (this.question && this.question.required && this.point !== 1) {
      this.errorState.isRequired = true;
      this.errorState.hasError = true;
    } else if (this.question.payload['max-length']
      && typeof this.question.answer === 'string'
      && this.question.payload['max-length'] < this.question.answer.length) {
      this.errorState.exceedMaxLength = true;
      this.errorState.hasError = true;
    }
  }

}
