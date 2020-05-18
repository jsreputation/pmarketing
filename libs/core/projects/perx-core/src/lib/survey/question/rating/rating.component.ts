import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IAnswer, SurveyQuestionType } from '../../models/survey.model';

/* eslint-disable */
export enum SurveyRatingIcons {
  star = 'star_border',
  star_selected = 'star',
  heart = 'favorite_border',
  heart_selected = 'favorite',
  circle = 'panorama_fish_eye',
  circle_selected = 'brightness_1',
}
/* eslint-enable */

export interface IRatingPayload {
  type: SurveyQuestionType.rating;
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
  public payload: IRatingPayload;

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

  public surveyRatingIcons(index: number): string {
    const iconName = index <= this.selectedChoice ? `${this.payload.shape}_selected` : this.payload.shape;
    return SurveyRatingIcons[iconName || 'star']; // default icon if is undefined
  }

  public onSelect(index: number): void {
    this.selectedChoice = index;
    this.updateAnswers.emit({ content: index });
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
