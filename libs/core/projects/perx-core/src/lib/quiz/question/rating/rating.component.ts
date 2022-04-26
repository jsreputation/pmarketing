import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuizQuestionType } from '../../models/quiz.model';

export enum SurveyRatingIcons {
  star = 'star_border',
  starSelected = 'star',
  heart = 'favorite_border',
  heartSelected = 'favorite',
  circle = 'panorama_fish_eye',
  circleSelected = 'brightness_1',
}

export interface IRatingPayload {
  type: QuizQuestionType.rating;
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
  public payload: IRatingPayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<number[]> = new EventEmitter<number[]>();

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
    this.updateAnswers.emit([index]);
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
