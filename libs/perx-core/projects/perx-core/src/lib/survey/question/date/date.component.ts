import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer } from '../../models/survey.model';

interface IPayloadDate {
  type: string;
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

  @Input()
  public flushTrigger: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string;

  public updateInput(value: string): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
