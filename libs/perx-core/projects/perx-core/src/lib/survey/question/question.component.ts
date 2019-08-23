import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer } from '../models/survey.model';

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
  public flush: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updateQuestionPointer: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateFlushEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hasError: boolean;

  public point: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.questionPointer) {
      this.questionPointer = changes.questionPointer.currentValue;
    }
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

  public updateAnswer(answer?: IAnswer): void {
    let questionId = this.question.id;
    if (answer) {
      this.question.answer = answer.content;
      this.point = answer.point;
      questionId = answer.question_id || questionId;
    }

    this.updatePoint();
    this.updateErrorState();
    if (this.question.payload.type === SurveyQuestionType.questionGroup) {
      this.updateAnswers.emit({ question_id: this.question.id, content: undefined, point: this.point });
    } else {
      this.updateAnswers.emit({ question_id: questionId, content: this.question.answer, point: this.point });
    }
  }

  public updatePoint(): void {
    if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
      this.point = this.question.required ? (this.question.answer === 0 || this.question.answer ? 1 : 0) : 1;
    }
  }

  public next(): void {
    this.updateErrorState();
    if (!this.hasError) {
      this.questionPointer++;
      this.updateQuestionPointer.emit(this.questionPointer);
    } else if (this.question.payload.type === SurveyQuestionType.questionGroup) {
      this.flush = true;
    }
  }

  public back(): void {
    this.questionPointer--;
    this.updateQuestionPointer.emit(this.questionPointer);
  }

  public updateErrorState(): void {
    this.hasError = false;
    if (this.question.required && this.point !== 1) {
      this.hasError = true;
    }
  }

  public updateFlush(finish: boolean): void {
    this.updateFlushEmit.emit(finish);
  }
}
