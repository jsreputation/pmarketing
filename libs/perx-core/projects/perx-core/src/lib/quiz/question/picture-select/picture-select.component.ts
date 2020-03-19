import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ITracker } from '../../models/quiz.model';

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
  selector: 'perx-core-quiz-picture-select',
  templateUrl: './picture-select.component.html',
  styleUrls: ['./picture-select.component.scss']
})
export class QuizPictureSelectComponent implements OnChanges {

  @Input()
  public payload: IPayloadPictureSelect;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<string[]> = new EventEmitter<string[]>();

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
    let result: string[] = [];
    if (this.payload.multiple && this.selectedChoices) {
      result = Object.entries(this.selectedChoices)
        .filter(([key, value]) => key !== undefined && value !== undefined && value !== false)
        .map(data => data[0]);
    } else {
      result[0] = this.selectedChoice.toString();
    }
    this.updateAnswers.emit(result);
  }
  public isSelected(index: number): boolean {
    return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
  }
}
