import { Component, Input, EventEmitter, Output } from '@angular/core';

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
