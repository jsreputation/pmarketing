import { Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ISearchHistory, ITrending, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';
import { switchMap, debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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
  public searchSuggestion: string[] = [];
  public searchEvent$: BehaviorSubject<string> = new BehaviorSubject();

  constructor(private route: Router,
              public router: Router,
              private rewardsService: RewardsService,
              private filterService: FilterService) {
    super();
  }
  
  ngOnInit(): void {

    this.rewardsService
    .getTrending()
    .subscribe((searchHistory: ITrending[]) => {
      this.trendingList = searchHistory.map((item) => item.value);
    });

    this.filterService
      .filterValue$.subscribe(filter => {
        this.searchValue = filter.searchValue;
    });

    this.searchEvent$.pipe(
      debounceTime(500),
      switchMap((searchQuery: string) => this.rewardsService.getSearchSuggestion(searchQuery))
    ).subscribe((searchSuggestion: ISearchSuggestion[])=>{
      this.searchSuggestion = searchSuggestion.map(item=> item.value); // extract only the values, type not of concern
    });
  }

  searchValueChange(event) {
    const value = event.target.value;
    this.searchValue = value;
    if (!value) {
      this.isExpanded = false;
    } else {
      this.searchEvent$.next(value);
    }

    if (value && event.code === 'Enter') {
      this.search(value);
    }
  }

  clearSearchValue(event) {
    this.searchValue = '';
    this.searchSuggestion = [];
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
