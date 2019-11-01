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
    if (this.payload.multiple) {
      result = Object.entries(this.selectedChoices)
        .map(data => {
          if (data[1]) {
            return data[0];
          }
        })
        .filter(data => data);
    } else {
      result[0] = this.selectedChoice.toString();
    }
    this.updateAnswers.emit({ content: result });
  }

  public isSelected(index: number): boolean {
    return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
  }
}
