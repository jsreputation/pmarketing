import { Injectable } from '@angular/core';
import { RewardsService } from '@perxtech/core';
import { FILTER_DATA } from '../../mock-data/filter-data.mock';
import { IFilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterValue: IFilterModel = {
    searchValue: '',
    accountTypes: [],
    categories: [],
    tags: [],
    locations: [],
  };

  constructor(private rewardsService: RewardsService) {
    this.initialFilterValue();
  }

  initialFilterValue() {
    this.filterValue = { searchValue: '', ...FILTER_DATA };
    // this.rewardsService.getCategoriesFilter().subscribe((categories)=>{
    //   this.filterValue.categories = this.getCategoriesFilterSource(categories).map(item=> {
    //     return {
    //       name: item.title,
    //       value: true,
    //       children: item.child.map(childItem=> { return {name: childItem.title, value: true}})
    //     }
    //   });
    // });
  }

  // private getCategoriesFilterSource(categories:any[]) {
  //   const  parentCategories = categories.filter(item=> item.parent === null);
  //   const childCategories = categories.filter(item=> item.parent !== null);
  //     return parentCategories.map(parentItem=>{
  //       return { ...parentItem, child:childCategories.filter(item=> item.parent.id === parentItem.id)};
  //     })
  // }

  setFilterValue(filterValue: IFilterModel) {
    this.filterValue = filterValue;
  }

  get getFilterValue(): IFilterModel {
    return this.filterValue;
  }
}
