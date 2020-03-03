import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer, ITracker } from '../../models/survey.model';

interface IPayloadSelect {
  type: string;
  multiple: boolean;
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

  public selectedChoices: ITracker = {};
  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.emitValue();
    }
  }

  public emitValue(): void {
    let result: string[] = [];
    console.log(this.selectedChoices);
    if (this.payload.multiple && this.selectedChoices) {
      console.log('i am here, multiple');
      result = Object.entries(this.selectedChoices)
        .filter(([key, value]) => key !== undefined && value !== undefined || false)
        .map(data => data[0]);
    } else {
      result[0] = this.selectedChoice.toString();
    }
    console.log(result, 'what is the result?');
    this.updateAnswers.emit({ content: result });
  }

  public isSelected(index: number): boolean {
    return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
  }
}
