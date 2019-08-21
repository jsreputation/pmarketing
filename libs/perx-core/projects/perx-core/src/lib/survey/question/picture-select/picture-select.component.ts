import { Component, Input, Output, EventEmitter } from '@angular/core';

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
export class PictureSelectComponent {

  @Input()
  public payload: IPayloadPictureSelect;

  @Output()
  public updateAnswers: EventEmitter<number> = new EventEmitter<number>();

  public selectedChoice: number;

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit(index);
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
