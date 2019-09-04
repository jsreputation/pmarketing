import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { MatDatepicker } from '@angular/material';
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
  @ViewChild('dateInputToFocus', { static: false }) private dateInputToFocus: ElementRef;

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

  public openCalendar(picker: MatDatepicker<Date>): void {
    picker.open();
    setTimeout(() => this.dateInputToFocus.nativeElement.focus());
  }

  public eventCloseHandler(): void {
    setTimeout(() => this.dateInputToFocus.nativeElement.blur());
  }

  public updateInput(value: string): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
