import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-tab-item-view',
  templateUrl: './tab-item-view.component.html',
  styleUrls: ['./tab-item-view.component.scss']
})
export class TabItemViewComponent {
  @Input() public data: ITotal;
}
