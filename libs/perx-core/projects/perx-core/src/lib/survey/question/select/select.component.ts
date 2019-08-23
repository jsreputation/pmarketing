import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IAnswer } from '../../models/survey.model';

interface IPayloadSelect {
  type: string;
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

  @Input()
  public flushTrigger: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public selectedChoice: number;

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit({ content: index });
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
