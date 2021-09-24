import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FeaturedDeals } from '../../../models/featured-deals.models';

@Component({
  selector: 'bdo-featured-deals',
  templateUrl: './featured-deals.component.html',
  styleUrls: ['./featured-deals.component.scss']
})
export class FeatureDealsComponent {
  @Input() deals: FeaturedDeals[] = [];
  @Output() eventItemClick: EventEmitter<FeaturedDeals> = new EventEmitter<FeaturedDeals>();
 
  itemClick(featureDealsItem:FeaturedDeals){
    this.eventItemClick.emit(featureDealsItem);
  }
}
