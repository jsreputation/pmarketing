import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class PhoneComponent implements OnChanges {
  @Input()
  public payload: IPayloadPhone;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: number): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
