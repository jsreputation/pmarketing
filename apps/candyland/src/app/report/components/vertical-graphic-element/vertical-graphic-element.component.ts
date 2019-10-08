import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-vertical-graphic-element',
  templateUrl: './vertical-graphic-element.component.html',
  styleUrls: ['./vertical-graphic-element.component.scss']
})
export class VerticalGraphicElementComponent {
  @Input() public item: any;
  @Input() public index: number;
  @Input() public first: boolean;
  @Input() public last: boolean;
  @Input() public graphicData: any;
}
