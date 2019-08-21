import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

interface IPayloadRating {
  type: SurveyQuestionType;
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
export class RatingComponent {
  @Input()
  public payload: IPayloadRating;

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
