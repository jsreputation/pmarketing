import { Component, Input } from '@angular/core';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';

@Component({
  selector: 'cl-tab-item-view',
  templateUrl: './tab-item-view.component.html',
  styleUrls: ['./tab-item-view.component.scss']
})
export class TabItemViewComponent {
  @Input() public data: ITotal;
  @Input() public value: number;
  public fractionSize: any;
}
