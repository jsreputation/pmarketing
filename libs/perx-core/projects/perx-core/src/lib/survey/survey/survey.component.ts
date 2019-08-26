import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAnswer, ISurvey, ITracker, IPoints } from '../models/survey.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input('data')
  public data$: Observable<ISurvey>;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  public answersTracker: ITracker = {};

  public pointsTracker: ITracker = {};

  public data: ISurvey;

  public questionPointer: number = 0;

  public ngOnInit(): void {
    this.data$.subscribe(data => this.data = data);
  }

  public updateAnswers(answer: IAnswer): void {
    this.answersTracker[answer.question_id] = answer;
  }

  public updatePoints(points: IPoints): void {
    this.pointsTracker[points.question_id] = points.point;
    this.updateParent();
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
      console.log('answers: ' + JSON.stringify(answers));
    }
  }

  public updateQuestionPointer(action: string): void {
    if (action === 'next') {
      this.questionPointer++;
    } else {
      this.questionPointer--;
    }
  }

  public calculatePoints(): number {
    return Object.values(this.pointsTracker).reduce((sum, point) => {
      return sum + point;
    }, 0);
  }
}
