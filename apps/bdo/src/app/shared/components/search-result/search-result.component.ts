import { Component, Input} from '@angular/core';
import { IReward } from '@perxtech/core';

@Component({
  selector: 'bdo-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() result: IReward[] = [];

  selectedItem(item: IReward) {
    console.log(item);
  }
}
