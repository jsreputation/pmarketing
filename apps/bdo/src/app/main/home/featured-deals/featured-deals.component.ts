import { Component, EventEmitter, Input, Output} from '@angular/core';
import { IReward } from '@perxtech/core';
import { mapRewardsToListItem } from '../../../shared/utilities/mapping.util';
import { IListItemModel } from '../../../shared/models/list-item.model';

@Component({
  selector: 'bdo-featured-deals',
  templateUrl: './featured-deals.component.html',
  styleUrls: ['./featured-deals.component.scss']
})
export class FeatureDealsComponent {
  urlImageDefault= "assets/images/light-gray-color-default-image.png"
  @Input() deals: IReward[] = [];
  @Output() eventItemClick: EventEmitter<IListItemModel> = new EventEmitter<IListItemModel>();
 
  itemClick(featureDealsItem:IReward){
    this.eventItemClick.emit(mapRewardsToListItem([featureDealsItem])[0]);
  }
}
