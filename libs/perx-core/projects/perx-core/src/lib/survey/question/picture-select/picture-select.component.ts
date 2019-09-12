import { IAnswer, ITracker } from './../../models/survey.model';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface IPayloadPictureSelect {
  type: string;
  multiple: boolean;
  choices: IPictureChoice[];
}

interface IPictureChoice {
  'img_url': string;
  text: string;
}
@Component({
  selector: 'perx-core-picture-select',
  templateUrl: './picture-select.component.html',
  styleUrls: ['./picture-select.component.scss']
})
export class PictureSelectComponent implements OnChanges {

  @Input()
  public payload: IPayloadPictureSelect;

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

  public onSelect(index: number): void {
    if (this.payload.multiple) {
      this.selectedChoices[index] = !this.selectedChoices[index];
    } else {
      this.selectedChoice = index;
    }
    this.emitValue();
  }

  public emitValue(): void {
    let result = [];
    if (this.payload.multiple) {
      result = Object.entries(this.selectedChoices).map(data => {
        if (data[1]) {
          return data[0];
        }
      }).filter(data => data);
    } else {
      result[0] = this.selectedChoice.toString();
    }
    this.updateAnswers.emit({ content: result });
  }
  public isSelected(index: number): boolean {
    return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index].includes(index) : this.selectedChoice === index;
  }
}
