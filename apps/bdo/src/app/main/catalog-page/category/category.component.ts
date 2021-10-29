import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '../../../shared/services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    public filterService: FilterService,
    private route: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params => {
      this.category = CATEGORY_CONFIGURATIONS.find(item => item.key === params.type);
      this.category = {
        ...this.category,
        children: this.category.children.map(sub =>
          params.category && this.equalOrIncludes(sub.key, params.category) ?
            {
              ...sub,
              selected: true,
              children: sub.children ? sub.children.map(card =>
                params.cardType && this.equalOrIncludes(card.key, params.cardType) ?
                  {
                    ...card,
                    selected: true
                  } : card
              ) : []
            } : sub
        )
      };
      this.selectedSubcategory = this.category.children.find(item => item.selected);
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

    const queryParams = {
      type: parentCategory?.type,
      category: childCategories.length === filterValue.categories.length ? null : childCategories,
      tags: tags.length === filterValue.tags.length ? null : tags
    };
    this.route.navigate(['catalog-page'], { queryParams: queryParams });
  }

  private equalOrIncludes(type, values) {
    if (Array.isArray(values)) {
      return values.includes(type);
    }
    return values === type;
  }
}
