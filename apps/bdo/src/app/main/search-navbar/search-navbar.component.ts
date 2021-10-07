import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'bdo-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss'],
})
export class SearchNavbarComponent {
  placeholder = 'Search Deals';
  icon = 'search-outline.svg';
  isExpanded = false;
  recomendedList: string[] = [];
  valueSearch = '';
  listTrending = [
    'lazada',
    'sale',
    'grafood',
    'zalora',
    'rebate',
    'landers',
    'shopee',
    'grad',
    '10% off',
    'voucher',
    'dine in',
    'tv',
  ];
  recommendedSearchValue = [
    'Buffet 50% Off',
    'Buffet 101',
    '25% Off Lunch Buffet',
    'Japanese Buffet',
  ];
  constructor(private route: Router) {

  }
  
  searchValueChange(event) {
    const value = event.target.value;
    this.valueSearch = value;
    if (!value) {
      this.icon = 'search-outline.svg';
      this.recomendedList = [];
    } else {
      this.icon = 'close.svg';
      this.recomendedList = this.recommendedSearchValue.filter((item) =>
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
    }

    if(value && event.code === 'Enter') {
      this.search(value);
    }
  }

  clearValueSearch(event) {
    this.valueSearch = '';
    this.recomendedList = [];
    this.icon = 'search-outline.svg';
    event.stopPropagation();
  }

  search(value: string) {
    this.valueSearch = value;
    this.isExpanded = false;
    this.route.navigate([`search/${this.valueSearch}`]);
  }
}
