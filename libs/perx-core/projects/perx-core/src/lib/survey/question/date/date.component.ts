import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
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
export class DateComponent implements OnChanges {
  @Input()
  public payload: IPayloadDate;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: string): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
