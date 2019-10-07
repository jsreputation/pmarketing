import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-rating-graphic',
  templateUrl: './rating-graphic.component.html',
  styleUrls: ['./rating-graphic.component.scss']
})
export class RatingGraphicComponent implements OnInit {
  @Input() public data: any;

}
