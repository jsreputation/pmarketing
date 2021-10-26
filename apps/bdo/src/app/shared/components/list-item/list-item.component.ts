import { Component, Input } from '@angular/core';
import { IReward } from '@perxtech/core';

@Component({
  selector: 'bdo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() reward: IReward;
  @Input() url: string[];
}
