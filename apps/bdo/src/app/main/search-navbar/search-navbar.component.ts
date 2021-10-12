import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ISearchHistory, RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss'],
})
export class SearchNavbarComponent implements OnInit{
  public isSearching = false;
  public isExpanded = false;
  public searchValue = '';
  public trendingList: string[] = [];
  public filteredSearchHistories: string[] = [];
  public searchHistories: string[] = [];
  constructor(private route: Router, private rewardsService: RewardsService) { }
  
  ngOnInit(): void {
    this.rewardsService.getSearchHistory().subscribe((searchHistory: ISearchHistory[])=>{
      this.searchHistories = searchHistory.map(item=> item.value);
      this.filteredSearchHistories = this.searchHistories;
    });
  }
  
  searchValueChange(event) {
    const value = event.target.value;
    this.searchValue = value;
    if (!value) {
      this.isSearching = false;
      this.filteredSearchHistories = this.searchHistories;
    } else {
      this.isSearching = true;
      this.filteredSearchHistories = this.searchHistories.filter((item) =>
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }

    if(value && event.code === 'Enter') {
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
    this.route.navigate([`search/${this.searchValue}`]);
  }
}
