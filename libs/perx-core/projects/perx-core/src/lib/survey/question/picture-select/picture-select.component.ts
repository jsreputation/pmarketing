import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';


interface IPayloadPictureSelect {
  type: SurveyQuestionType;
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
export class PictureSelectComponent {

  @Input()
  public payload: IPayloadPictureSelect;

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
