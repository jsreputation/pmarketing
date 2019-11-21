import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
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
export class DateComponent implements OnChanges, OnInit {
  @ViewChild('picker', { static: false }) public picker: MatDatepicker<Date>;
  @ViewChild('pickerFrom', { static: false }) public pickerFrom: MatDatepicker<Date>;
  @ViewChild('pickerTo', { static: false }) public pickerTo: MatDatepicker<Date>;
  @ViewChild('pickerInput', { static: false }) public pickerInput: ElementRef;
  @ViewChild('pickerToInput', { static: false }) public pickerToInput: ElementRef;
  @ViewChild('pickerFromInput', { static: false }) public pickerFromInput: ElementRef;

  @Input()
  public payload: IPayloadDate;

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
