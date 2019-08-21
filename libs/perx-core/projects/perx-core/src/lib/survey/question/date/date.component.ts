import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

interface IPayloadDate {
  type: SurveyQuestionType;
  period?: boolean;
}

@Component({
  selector: 'perx-core-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  @Input()
  public payload: IPayloadDate;

  @Output()
  public updateAnswers: EventEmitter<string> = new EventEmitter<string>();

  public updateInput(value: string): void {
    this.updateAnswers.emit(value);
  }
}
