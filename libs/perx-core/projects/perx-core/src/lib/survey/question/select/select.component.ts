import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

interface IPayloadSelect {
  type: SurveyQuestionType;
  choices: string[];
}

@Component({
  selector: 'perx-core-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {

  @Input()
  public payload: IPayloadSelect;

  @Output()
  public updateAnswer: EventEmitter<number> = new EventEmitter<number>();

  public selectedChoice: number;

  public select(index: number): void {
    this.selectedChoice = index;
    this.updateAnswer.emit(index);
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
