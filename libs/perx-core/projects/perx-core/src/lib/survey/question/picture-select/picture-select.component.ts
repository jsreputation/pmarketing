import { IAnswer } from './../../models/survey.model';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface IPayloadPictureSelect {
  type: string;
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
export class PictureSelectComponent implements OnChanges{

  @Input()
  public payload: IPayloadPictureSelect;

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
