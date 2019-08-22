import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
  public flushValidation: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<number> = new EventEmitter<number>();

  public answer: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flushValidation && changes.flushValidation.currentValue) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: number): void {
    this.answer = value;
    this.updateAnswers.emit(value);
  }
}
