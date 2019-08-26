import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IQuestion, SurveyQuestionType, IAnswer, IPoints } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {

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

  public hasError: boolean;

  public point: number;

  public ngOnInit(): void {
    // Emit non required question in first page, and stop auto emit for last page
    if (this.isActive && !this.question.required && (this.questionPointer !== this.totalQuestions - 1)) {
      this.updateAnswer({content: undefined});
    }
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.questionPointer) {
      this.questionPointer = changes.questionPointer.currentValue;
      if (this.isActive && !this.question.required && (this.questionPointer !== this.totalQuestions - 1)) {
        // Emit non required question in current page after questionPointer update, and stop auto emit for last page
        this.updateAnswer({content: undefined});
      }
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
    return this.questionPointer === undefined || this.questionPointer === this.id;
  }

  public updateAnswer(answer: IAnswer): void {
    this.question.answer = answer.content;
    this.updateNonGroupPoint();
    const questionId = answer.question_id ? answer.question_id : this.question.id;
    this.updateAnswers.emit({ question_id: questionId, content: answer.content });
    this.questionValidation();
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
    this.hasError = false;
    if (this.question.required && this.point !== 1) {
      this.hasError = true;
    }
  }

}
