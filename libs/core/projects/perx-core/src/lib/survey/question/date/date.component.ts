import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { IAnswer, IDateRange, SurveyQuestionType } from '../../models/survey.model';

export interface IDatePayload {
  type: SurveyQuestionType.date;
  duration: boolean;
}

@Component({
  selector: 'perx-core-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnChanges, OnInit {
  @ViewChild('picker', { static: false }) private picker: MatDatepicker<Date>;
  @ViewChild('pickerTo', { static: false }) private pickerTo: MatDatepicker<Date>;
  @ViewChild('pickerInput', { static: false }) private pickerInput: ElementRef;
  @ViewChild('pickerToInput', { static: false }) private pickerToInput: ElementRef;
  @ViewChild('pickerFromInput', { static: false }) private pickerFromInput: ElementRef;

  @Input()
  public payload: IDatePayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string | IDateRange;

  public ngOnInit(): void {
    this.answer = this.answer || (this.payload && this.payload.duration) ? { from: '', to: '' } : '';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public openCalendar(): void {
    this.picker.open();
    setTimeout(() => this.pickerInput.nativeElement.focus());
  }

  public eventCloseHandler(): void {
    setTimeout(() => this.pickerInput.nativeElement.blur());
  }

  public openCalendarTo(): void {
    this.pickerTo.open();
    setTimeout(() => this.pickerToInput.nativeElement.focus());
  }

  public eventCloseHandlerTo(): void {
    setTimeout(() => this.pickerToInput.nativeElement.blur());
  }

  public openCalendarFrom(): void {
    this.picker.open();
    setTimeout(() => this.pickerFromInput.nativeElement.focus());
  }

  public eventCloseHandlerFrom(): void {
    setTimeout(() => this.pickerFromInput.nativeElement.blur());
  }

  public updateInput(value: string | IDateRange): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }

  public updateInputFrom(value: string): void {
    this.answer = Object.assign(this.answer, { from: value });
    // @ts-ignore
    /*eslint-disable*/
    if (this.answer['from'] && this.answer['to']) {
      this.updateAnswers.emit({ content: this.answer });
    }
  }

  public updateInputTo(value: string): void {
    this.answer = Object.assign(this.answer, { to: value });
    // @ts-ignore
    /*eslint-disable*/
    if (this.answer['from'] && this.answer['to']) {
      this.updateAnswers.emit({ content: this.answer });
    }
  }
}
