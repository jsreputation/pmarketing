import { Component, Input} from '@angular/core';
import { IListItemModel } from '../../models/list-item.model';

@Component({
  selector: 'bdo-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() result: IListItemModel[] = [];
  selectedItem(item: IListItemModel) {
    console.log(item);
  }
}
