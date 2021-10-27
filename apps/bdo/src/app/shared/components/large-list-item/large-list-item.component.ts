import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReward } from '@perxtech/core';


@Component({
  selector: 'bdo-large-list-item',
  templateUrl: './large-list-item.component.html',
  styleUrls: ['./large-list-item.component.scss']
})
export class LargeListItemComponent {
  @Input() reward: IReward;
  @Output() itemSelected: EventEmitter<IReward> = new EventEmitter<IReward>();
  @Input() url: string[];
  public defaultImageUrl  = "assets/images/light-gray-color-default-image.png";
  selectItem(item: IReward) {
    this.itemSelected.emit(item);
  }
}
