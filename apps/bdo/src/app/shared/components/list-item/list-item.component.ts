import { Component, Input } from '@angular/core';
import { IListItemModel } from '../../models/list-item.model';

@Component({
  selector: 'bdo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() reward: IListItemModel;
}
