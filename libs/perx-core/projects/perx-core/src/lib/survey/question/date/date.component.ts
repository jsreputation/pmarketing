import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
  public flushValidation: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<string> = new EventEmitter<string>();

  public answer: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flushValidation && changes.flushValidation.currentValue) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: string): void {
    this.answer = value;
    this.updateAnswers.emit(value);
  }
}
