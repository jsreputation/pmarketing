import { Component, EventEmitter, Input, Output} from '@angular/core';
import { IReward } from '@perxtech/core';

@Component({
  selector: 'bdo-featured-deals',
  templateUrl: './featured-deals.component.html',
  styleUrls: ['./featured-deals.component.scss']
})
export class FeatureDealsComponent {
  urlImageDefault= "assets/images/light-gray-color-default-image.png"
  @Input() deals: IReward[] = [];
  @Output() eventItemClick: EventEmitter<IReward> = new EventEmitter<IReward>();
 
  itemClick(featureDealsItem:IReward){
    this.eventItemClick.emit(featureDealsItem);
  }
}
