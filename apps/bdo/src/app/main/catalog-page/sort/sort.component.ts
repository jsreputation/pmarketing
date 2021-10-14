import { Component } from '@angular/core';
import { SEARCH_RESULT } from '../../../mock-data/search-result.mock';
import { IReward } from '@perxtech/core';
@Component({
    selector: 'bdo-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss']
})
export class SortComponent {
    searchResult: IReward[] = SEARCH_RESULT;
    sortBy = "you";

}
