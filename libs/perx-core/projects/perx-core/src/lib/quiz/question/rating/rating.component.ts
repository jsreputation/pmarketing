import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IQAnswer, SurveyRatingIcons } from '../../models/quiz.model';

interface IPayloadRating {
  type: string;
  color?: string;
  left_label?: string;
  right_label?: string;
  scale?: number;
  shape?: string;
}
@Component({
  selector: 'perx-core-quiz-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class QuizRatingComponent implements OnChanges {
  @Input()
  public payload: IPayloadRating;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IQAnswer> = new EventEmitter<IQAnswer>();

  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.onSelect(this.selectedChoice);
    }
  }

  public quizRatingIcons(index: number): SurveyRatingIcons {
    const shape: string = this.payload.shape || 'star';
    const iconName = index <= this.selectedChoice ? `${shape}Selected` : shape;
    return SurveyRatingIcons[iconName]; // default icon if is undefined
  }

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit({ content: index });
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
