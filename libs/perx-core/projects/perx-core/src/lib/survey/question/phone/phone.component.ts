import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer } from '../../models/survey.model';

interface IPayloadPhone {
  type: string;
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

  @Input()
  public flushTrigger: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: number;

  public updateInput(value: number): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
