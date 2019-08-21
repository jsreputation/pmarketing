import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

interface IPayloadLongText {
  type: SurveyQuestionType;
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

  @Output()
  public updateAnswers: EventEmitter<string> = new EventEmitter<string>();

  public updateInput(value: string): void {
    this.updateAnswers.emit(value);
  }
}
