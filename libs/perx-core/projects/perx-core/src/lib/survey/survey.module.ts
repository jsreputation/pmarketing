import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { SelectionComponent } from './selection/selection.component';

@NgModule({
  declarations: [RatingComponent, SelectionComponent],
  imports: [
    CommonModule
  ]
})
export class SurveyModule { }
