import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

interface IPayloadPhone {
  type: SurveyQuestionType;
  'default_country_code': string;
}

@Component({
  selector: 'perx-core-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {
  @Input()
  public payload: IPayloadPhone;

  @Output()
  public updateAnswers: EventEmitter<number> = new EventEmitter<number>();

  public updateInput(value: number): void {
    this.updateAnswers.emit(value);
  }
}
