import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-question-group-graphic',
  templateUrl: './question-group-graphic.component.html',
  styleUrls: ['./question-group-graphic.component.scss']
})
export class QuestionGroupGraphicComponent {
  @Input() public data: any;
  @Input() public currentIndex: number;

}
