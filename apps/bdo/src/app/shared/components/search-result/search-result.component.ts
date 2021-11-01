import { Component, Input} from '@angular/core';
import { IListItemModel } from '../../models/list-item.model';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../../../../starhub/src/app/utils/fade-animations';

@Component({
  selector: 'bdo-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
})
export class SearchResultComponent {
  @Input() result: IListItemModel[] = [];
  @Input() isLoaded = false;
  public ghostRewards= new Array(1);
  selectedItem(item: IListItemModel) {
    console.log(item);
  }
}
