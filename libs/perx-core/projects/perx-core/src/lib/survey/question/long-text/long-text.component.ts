import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer } from '../../models/survey.model';

interface IPayloadLongText {
  type: string;
  'max-length': number;
}

@Component({
  selector: 'perx-core-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class LongTextComponent implements OnChanges {

  @Input()
  public payload: IPayloadLongText;

  @Input()
  public flush: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: string): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
