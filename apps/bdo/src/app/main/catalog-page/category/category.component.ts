import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../../shared/services/filter.service';
import { Router } from '@angular/router';
import { ItemModel } from '../../../shared/models/item.model';
import { CATEGORY_CONFIGURATIONS } from '../../../shared/constants/category-configuration.const';

@Component({
  selector: 'bdo-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() categoryCode = '';
  category: ItemModel;
  selectedSubcategory: ItemModel;
  categoryHeader: { displayName:string, className:string };
  isTag = false;

  constructor(
    public filterService: FilterService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.filterService.filterValue$.subscribe(filterValue => {
      if (filterValue) {
        this.category = CATEGORY_CONFIGURATIONS.find(item => item.key === filterValue.type);
        const selectedFilterCategory = filterValue.categories.find(item => item.selected);
        this.category = {
          ...this.category,
          children: this.category?.children ? this.category.children
            .filter(sub => selectedFilterCategory.children.find(item => item.name === sub.name))
            .map(sub =>
              ({
              ...sub,
                selected: selectedFilterCategory.children.some(item => !item.selected) || selectedFilterCategory.children.length == 1 ?
                  selectedFilterCategory.children.find(item => item.name === sub.name)?.selected : false,
                children: sub.children ? sub.children.map(card =>
                  filterValue.cardType.some(item => !item.selected) || filterValue.cardType.length == 1 ?
                    {
                      ...card,
                      selected: filterValue.cardType.find(item => item.type === card.key)?.selected
                    } : card
                ) : []
              })
            ) : []
        };
        if (!this.category.name) {
          const tagName = filterValue.tags.find(tag=> tag.selected).name;
          this.isTag = true;
          this.categoryHeader = { displayName: tagName === 'featured' ? `What's new` : tagName, className: tagName === 'featured' ? 'new' : tagName };
        } else {
          this.isTag = false;
          this.categoryHeader = { displayName:this.category.name, className:'' };
        }
        this.selectedSubcategory = this.category.children.find(item => item.selected);
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
    this.category.children = this.category.children
      .map(item => item.key === selectedItem.key ? { ...item, selected: !selectedItem.selected } : { ...item, selected: false });
    this.selectedSubcategory = this.category.children.find(item => item.selected);
    this.buildCategoryParamsAndNavigate();
  }

  selectSubcategoryChildren(selectedItem: ItemModel) {
    this.selectedSubcategory.children = this.selectedSubcategory.children
      .map(item => item.key === selectedItem.key ? { ...item, selected: !selectedItem.selected } : { ...item, selected: false });
    this.buildCategoryParamsAndNavigate();
  }

  private buildCategoryParamsAndNavigate() {
    const queryParams: { [name: string]: string | string[] } = {};
    queryParams.type = this.category.key;
    queryParams.category = this.category.children.filter(item => item.selected).map(item => item.key);
    queryParams.cardType = this.selectedSubcategory?.children ?
      this.selectedSubcategory.children.filter(item => item.selected).map(item => item.key) : null;
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
