import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItemModel } from '../../models/list-item.model';
import { FILTER_DATA } from '../../constants/filter-configuration.const';
import { ITag } from '@perxtech/core';


@Component({
  selector: 'bdo-large-list-item',
  templateUrl: './large-list-item.component.html',
  styleUrls: ['./large-list-item.component.scss']
})
export class LargeListItemComponent {
  @Input() reward: IListItemModel;
  @Output() itemSelected: EventEmitter<IListItemModel> = new EventEmitter<IListItemModel>();
  public defaultImageUrl  = "assets/images/light-gray-color-default-image.png";
  selectItem(item: IListItemModel) {
    this.itemSelected.emit(item);
  }

  public existsInFilters(tag: ITag): boolean {
    return !!FILTER_DATA.tags.find(element => element.type === tag.name);
  }
}
