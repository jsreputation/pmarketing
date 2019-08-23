import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer, ISurvey, ITracker } from '../models/survey.model';
@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  @Input()
  public data: ISurvey;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  public answersTracker: ITracker = {};

  public questionPointer: number = 0;

  public completeSurvey(): void {
    this.surveyDone.emit();
  }

  public updateAnswers(answer: IAnswer): void {
    this.answersTracker[answer.question_id] = answer;
    this.updateParent();
    console.log(this.answersTracker);
  }

  public updateParent(): void {
    const currentPoint = this.calculatePoints();
    const totalQuestion = this.data.questions.length;
    this.totalLength.emit(totalQuestion);
    this.currentPointer.emit(currentPoint);
    console.log('====================');
    console.log('totalQuestion: ' + totalQuestion);
    console.log('currentPoint: ' + currentPoint);
    console.log('====================');
    if (currentPoint >= totalQuestion) {
      const answers = Object.entries(this.answersTracker).map(([id, answer]) => {
        return {
          question_id: id,
          content: answer.content
        };
      });
      this.surveyDone.emit(answers);
      console.log('answers: ' + answers);
    }
  }

  public updateQuestionPointer(questionPointer: number): void {
    this.questionPointer = questionPointer;
  }

  public calculatePoints(): number {
    return Object.values(this.answersTracker).reduce((sum, answer) => {
      return sum + answer.point;
    }, 0);
  }
}
