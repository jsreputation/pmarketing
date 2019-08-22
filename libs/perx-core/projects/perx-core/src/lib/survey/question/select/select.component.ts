import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

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
  public flushValidation: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<number> = new EventEmitter<number>();

  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flushValidation && changes.flushValidation.currentValue) {
      this.onSelect(this.selectedChoice);
    }
  }

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit(index);
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
