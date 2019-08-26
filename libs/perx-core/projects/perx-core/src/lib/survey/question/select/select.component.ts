import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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

export class SelectComponent implements OnChanges {

  @Input()
  public payload: IPayloadSelect;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.onSelect(this.selectedChoice);
    }
  }

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit({ content: index });
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
