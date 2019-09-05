import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { IAnswer, IDateRange } from '../../models/survey.model';

interface IPayloadDate {
  type: string;
  duration: boolean;
  period?: boolean;
}

@Component({
  selector: 'perx-core-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnChanges {
  @ViewChild('dateInputToFocus', { static: false }) private dateInputToFocus: ElementRef;

  @Input()
  public payload: IPayloadDate;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string | IDateRange;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public openCalendar(picker: MatDatepicker<Date>): void {
    picker.open();
    setTimeout(() => this.dateInputToFocus.nativeElement.focus());
  }

  public eventCloseHandler(): void {
    setTimeout(() => this.dateInputToFocus.nativeElement.blur());
  }

  public updateInput(value: string | IDateRange): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }

  public updateInputFrom(value: string): void {
    const newAnswer = Object.assign(this.answer, { from: value });
    this.answer = newAnswer;
    this.updateAnswers.emit({ content: this.answer });
  }

  public updateInputTo(value: string): void {
    const newAnswer = Object.assign(this.answer, { to: value });
    this.answer = newAnswer;
    this.updateAnswers.emit({ content: this.answer });
  }
}
