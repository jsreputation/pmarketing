import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer, IPoints } from '../models/survey.model';

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
  public flushValidation: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  @Output()
  public updatePoints: EventEmitter<IPoints> = new EventEmitter<IPoints>();

  @Output()
  public updateQuestionPointer: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public updateFlushValidationEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hasError: boolean;

  public point: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.questionPointer) {
      this.questionPointer = changes.questionPointer.currentValue;
    }
    if (changes.flushValidation) {
      this.flushValidation = changes.flushValidation.currentValue;
      if (this.flushValidation) {
        this.questionValidation();
      }
    }
  }

  public get surveyQuestionType(): typeof SurveyQuestionType { return SurveyQuestionType; }

  public get isActive(): boolean {
    return this.questionPointer === this.id;
  }

  public updateAnswer(answer: string | number | boolean): void {
    console.log('updateAnswer' + this.question.id);
    this.question.answer = answer;
    this.updateNonGroupPoint();
    this.questionValidation();
    this.updateAnswers.emit({ question_id: this.question.id, content: answer });
    /**
     * Specially for those group type question end leaf, for normal question,
     * will do twice from here and next(), but survey question tracker will handle that
     */
  }

  public updateGroupPoint(point: number): void {
    this.point = point;
    this.updatePoints.emit({ question_id: this.question.id, point });
  }

  public updateNonGroupPoint(): void {
    if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
      this.point = this.question.required ? (this.question.answer === 0 || this.question.answer ? 1 : 0) : 1;
      this.updatePoints.emit({ question_id: this.question.id, point: this.point });
    }
  }

  public next(): void {
    this.questionValidation();
    if (!this.hasError) {
      this.updateNonGroupPoint();
      this.questionPointer++;
      this.updateQuestionPointer.emit(this.questionPointer);
    } else if (this.question.payload.type === SurveyQuestionType.questionGroup) {
      console.log('flush');
      this.flushValidation = true;
    }
  }

  public back(): void {
    this.questionPointer--;
    this.updateQuestionPointer.emit(this.questionPointer);
  }

  public questionValidation(): void {
    this.hasError = false;
    console.log(this.point);
    if (this.question.required && this.point !== 1) {
      this.hasError = true;
    }
  }

  public updateFlushValidation(finish: boolean): void {
    this.flushValidation = finish;
    console.log('flush finished' + this.question.id);
    this.updateFlushValidationEmit.emit(finish);
  }
}
