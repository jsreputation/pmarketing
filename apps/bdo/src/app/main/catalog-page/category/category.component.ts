import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../../shared/services/filter.service';
import { Router } from '@angular/router';
import { ItemModel } from '../../../shared/models/item.model';
import { CATEGORY_CONFIGURATIONS } from '../../../shared/constants/category-configuration.const';
import { IOptionsModel } from '../../../shared/models/filter.model';

@Component({
  selector: 'bdo-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() categoryCode = '';
  category: ItemModel;
  selectedSubcategory: ItemModel;
  categoryHeaders: { displayName: string, className: string }[];
  isTag = false;

  constructor(
    public filterService: FilterService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.filterService.filterValue$.subscribe(filterValue => {
      if (filterValue) {
        console.log("filterValue: ", filterValue)
        this.category = CATEGORY_CONFIGURATIONS.find(item => item.key === filterValue.type);
        console.log("category: ", this.category)

        const selectedFilterCategory = filterValue.categories.find(item => item.selected);

        console.log('selectedFilterCategory: ', selectedFilterCategory);
        this.category = {
          ...this.category,
          children: this.category?.children ? this.category.children
            .filter(sub => selectedFilterCategory?.children.find(item => item.name === sub.name))
            .map(sub =>
              ({
              ...sub,
                selected: selectedFilterCategory.children.some(item => !item.selected) || selectedFilterCategory.children.length == 1 ?
                  selectedFilterCategory.children.find(item => item.name === sub.name)?.selected : false,
                children: sub.children ? sub.children.map(card =>
                  {
                    if (selectedFilterCategory?.type === 'bdo-rewards') {
                      return filterValue.rewardType.some(item => !item.selected) || filterValue.rewardType.length == 1 ?
                        {
                          ...card,
                          selected: filterValue?.rewardType.find(item => item.type === card.key)?.selected
                        } : card;
                    } else {
                      return filterValue.cardType.some(item => !item.selected) || filterValue.cardType.length == 1 ?
                        {
                          ...card,
                          selected: filterValue.cardType.find(item => item.type === card.key)?.selected
                        } : card;
                    }
                  }
                ) : []
              })
            ) : []
        };
        if (!this.category.name) {
          const selectedTags = filterValue.tags.filter((tag) => tag.selected);
          this.isTag = selectedTags.length > 0 && selectedTags.length < filterValue.tags.length;
          if (this.isTag) {
            this.categoryHeaders = selectedTags.map((selectedTag: IOptionsModel) => {
              return {
                displayName: selectedTag.name === 'new' ? `What's new` : selectedTag.name,
                className: selectedTag.name,
              }
            });
          } else {
            this.categoryHeaders = [{ displayName: 'All', className: '' }];
          }
        } else {
          this.isTag = false;
          this.categoryHeaders = [{ displayName: this.category.name, className:'' }];
        }
        const selectedSubCategories = this.category.children.filter(item => item.selected);
        this.selectedSubcategory = selectedSubCategories?.length > 1 ? null : selectedSubCategories[0];
      }
    })
  }

  filter() {
    this.filterService.showFilterDialog(value => {
      if (value) {
        this.buildFilterQueryParamsAndNavigate(value);
      }
    });
  }

  selectSubcategory(selectedItem: ItemModel) {
    console.log('ItemModel: ', selectedItem);
    this.category.children = this.category.children
      .map(item => item.key === selectedItem.key ? { ...item, selected: !selectedItem.selected } : { ...item});
    const selectedSubCategories = this.category.children.filter(item => item.selected);
    this.selectedSubcategory = selectedSubCategories?.length > 1 ? null : selectedSubCategories[0];
    this.buildCategoryParamsAndNavigate();
  }

  selectSubcategoryChildren(selectedItem: ItemModel) {
    this.selectedSubcategory.children = this.selectedSubcategory.children
      .map(item => item.key === selectedItem.key ? { ...item, selected: !selectedItem.selected } : { ...item});
    this.buildCategoryParamsAndNavigate();
  }

  private buildCategoryParamsAndNavigate() {
    const queryParams: { [name: string]: string | string[] } = {};
    queryParams.type = this.category.key;
    queryParams.category = this.category.children.filter(item => item.selected).map(item => item.key);
    if (this.category.key === 'bdo-rewards') {
      queryParams.rewardType = this.selectedSubcategory?.children ?
      this.selectedSubcategory.children.filter(item => item.selected).map(item => item.key) : null;
    } else {
      queryParams.cardType = this.selectedSubcategory?.children ?
      this.selectedSubcategory.children.filter(item => item.selected).map(item => item.key) : null;
    } 
    this.route.navigate(['catalog-page'],{ queryParams: queryParams });
  }

  private buildFilterQueryParamsAndNavigate(filterValue) {
    const parentCategory = filterValue.categories.find(item => item.selected);
    const childCategories = parentCategory?.children.filter(item => item.selected).map(sub => sub.type);
    const tags = filterValue.tags.filter(tag => tag.selected).map(item => item.type);
    const locations = filterValue.locations.filter(location => location.selected).map(location => location.type);
    const queryParams = {
      type: parentCategory?.type,
      category: parentCategory?.children && childCategories?.length === parentCategory.children.length ? null : childCategories,
      tags: tags.length === filterValue.tags.length ? null : tags,
      locations: locations.length === filterValue.locations.length ? null : locations
    };
    this.route.navigate(['catalog-page'], { queryParams: queryParams });
  }
}
