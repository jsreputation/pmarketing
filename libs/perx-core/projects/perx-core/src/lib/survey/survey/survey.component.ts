import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAnswer, ISurvey, IPoints, ITracker } from '../models/survey.model';
import { HttpClient } from '@angular/common/http';
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

  public questionPointer: number = 0;

  constructor(private http: HttpClient) {
  }

  public ngOnInit(): void {
    if (!this.data) {
      this.http.get('../mocks/survey.json').subscribe((res: ISurvey) => this.data = res);
    }
  }

  public completeSurvey(): void {
    this.surveyDone.emit();
  }

  public updateAnswers(answer: IAnswer): void {
    this.answersTracker[answer.question_id] = answer.content;
  }

  public updatePoints(point: IPoints): void {
    this.pointsTracker[point.question_id] = point.point;
    this.updateParent();
  }

  public updateParent(): void {
    const currentPoint = this.calculatePoints();
    const totalQuestion = this.data.questions.length;
    this.totalLength.emit(totalQuestion);
    this.currentPointer.emit(currentPoint);
    console.log('====================');
    console.log(this.pointsTracker);
    console.log('totalQuestion: ' + totalQuestion);
    console.log('currentPoint: ' + currentPoint);
    console.log('====================');
    if (currentPoint >= totalQuestion) {
      const answers = Object.entries(this.answersTracker).map(([id, answer]) => {
        return {
          question_id: id,
          content: answer
        };
      });
      this.surveyDone.emit(answers);
      console.log(answers);
    }
  }

  public updateQuestionPointer(questionPointer: number): void {
    this.questionPointer = questionPointer;
  }

  public calculatePoints(): number {
    return Object.values(this.pointsTracker).reduce((previous, value) => {
      return previous + value;
    }, 0);
  }
}
