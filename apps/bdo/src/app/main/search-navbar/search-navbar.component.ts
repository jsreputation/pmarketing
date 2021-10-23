import { Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ISearchHistory, ITrending, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';

@Component({
  selector: 'bdo-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss'],
})
export class SearchNavbarComponent extends SelfDestruct implements OnInit{
  public isSearching = false;
  public isExpanded = false;
  public searchValue = '';
  public trendingList: string[] = [];
  public filteredSearchHistories: string[] = [];
  public searchHistories: string[] = [];
  constructor(private route: Router,
              public router: Router,
              private rewardsService: RewardsService,
              private filterService: FilterService) {
    super();
  }
  
  ngOnInit(): void {
    this.rewardsService.getSearchHistory().subscribe((searchHistory: ISearchHistory[])=>{
      this.searchHistories = searchHistory.map(item=> item.value);
      this.filteredSearchHistories = this.searchHistories;
    });

    this.rewardsService
    .getTrending()
    .subscribe((searchHistory: ITrending[]) => {
      this.trendingList = searchHistory.map((item) => item.value);
    });

    this.filterService
      .filterValue$.subscribe(filter => {
        this.searchValue = filter.searchValue;
    });

  }

  searchValueChange(event) {
    const value = event.target.value;
    this.searchValue = value;
    if (!value) {
      this.filteredSearchHistories = this.searchHistories;
    } else {
      this.filteredSearchHistories = this.searchHistories.filter((item) =>
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }

    if (value && event.code === 'Enter') {
      this.search(value);
    }
  }

  clearSearchValue(event) {
    this.searchValue = '';
    this.filteredSearchHistories = this.searchHistories;
    this.isSearching = false;
    event.stopPropagation();
  }

  search(value: string) {
    this.searchValue = value;
    this.isExpanded = false;
    this.isSearching = true;
    const queryParams: Params = { search: this.searchValue };
    this.route.navigate([`result`], { queryParams:queryParams });
  }

  navigateToSearchPage() {
    this.route.navigate([`search`]);
  }

  isSearchPage() {
    return ['/search', '/result'].includes(this.router.url);
  }

  onBlur() {
    this.isExpanded = false;
  }
}
