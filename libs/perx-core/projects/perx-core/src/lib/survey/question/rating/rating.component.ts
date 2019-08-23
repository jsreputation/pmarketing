import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer } from '../../models/survey.model';

interface IPayloadRating {
  type: string;
  color?: string;
  'left_label'?: string;
  'right_label'?: string;
  scale?: number;
  shape?: string;
}
@Component({
  selector: 'perx-core-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  @Input()
  public payload: IPayloadRating;

  @Input()
  public flush: boolean = false;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue) {
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
