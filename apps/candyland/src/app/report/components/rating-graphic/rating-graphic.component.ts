import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-rating-graphic',
  templateUrl: './rating-graphic.component.html',
  styleUrls: ['./rating-graphic.component.scss']
})
export class RatingGraphicComponent {
  @Input() public data: any;

}
