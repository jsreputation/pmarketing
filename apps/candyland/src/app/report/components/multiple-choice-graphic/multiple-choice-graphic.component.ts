import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-multiple-choice-graphic',
  templateUrl: './multiple-choice-graphic.component.html',
  styleUrls: ['./multiple-choice-graphic.component.scss']
})
export class MultipleChoiceGraphicComponent {
  @Input() public data: any;
}
