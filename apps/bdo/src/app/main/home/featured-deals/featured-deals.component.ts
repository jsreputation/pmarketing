import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItemModel } from '../../../shared/models/list-item.model';

@Component({
  selector: 'bdo-featured-deals',
  templateUrl: './featured-deals.component.html',
  styleUrls: [ './featured-deals.component.scss' ]
})
export class FeatureDealsComponent {
  public urlImageDefault = 'assets/images/light-gray-color-default-image.png';
  @Input() deals: IListItemModel[] = [];
  @Output() eventItemClick: EventEmitter<IListItemModel> = new EventEmitter<IListItemModel>();

  public itemClick(featureDealsItem: IListItemModel): void {
    this.eventItemClick.emit(featureDealsItem);
  }
}
