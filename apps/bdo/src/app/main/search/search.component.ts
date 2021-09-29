import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SEARCH_RESULT } from '../../mock-data/search-result.mock';
import { IReward } from '@perxtech/core';

@Component({
  selector: 'bdo-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit {
  searchValue = '';
  searchResult: IReward[] = SEARCH_RESULT;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.searchValue = param.text;
    });
  }
}
