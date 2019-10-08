import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-picture-choice-graphic',
  templateUrl: './picture-choice-graphic.component.html',
  styleUrls: ['./picture-choice-graphic.component.scss']
})
export class PictureChoiceGraphicComponent {
  @Input() public data: any;
}
