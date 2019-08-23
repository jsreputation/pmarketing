import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class LongTextComponent {

  @Input()
  public payload: IPayloadLongText;

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
