import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { IFilterModel } from '../../../models/filter.model';
import { FilterService } from '../../../services/filter.service';
import { CATALOG_CONFIGURATION } from '../../../constants/catalog-configuration.const';
import { SPECIAL_CATEGORIES } from '../../../utilities/filter.util';
import { Router } from '@angular/router';

@Component({
  selector: 'bdo-desktop-filter',
  templateUrl: './desktop-filter.component.html',
  styleUrls: ['./desktop-filter.component.scss']
})
export class DesktopFilterComponent implements OnInit {

  public desktopFilterForm: FormGroup;
  filterSource: IFilterModel;
  catalogConfiguration = CATALOG_CONFIGURATION;
  @Input() isNearbyFilter = false;

  constructor(
    private fb: FormBuilder,
    public filterService: FilterService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.filterSource = this.filterService.currentValue;
    this.renderForm();
    this.filterService.filterValue$.subscribe(filterValue => {
      if (filterValue) {
        this.filterSource = filterValue;
        this.renderForm();
      }});
  }

  getCategoriesFilterSource(categories: any[]) {
    const parentCategories = categories.filter((item) => item.parent === null);
    const childCategories = categories.filter((item) => item.parent !== null);
    return parentCategories.map((parentItem) => {
      return {
        ...parentItem,
        child: childCategories.filter(
          (item) => item.parent.id === parentItem.id
        ),
      };
    });
  }

  applyFilterClick() {
    const formValue = this.desktopFilterForm.value;
    formValue.tags = this.filterSource.tags;
    this.buildFilterQueryParamsAndNavigate(formValue);
  }

  resetFilterClick() {
    this.filterSource.categories.map(category=> category.selected = false);
    this.filterSource.tags.map(tag=> tag.selected = false);
    this.filterSource.locations.map(location=> location.selected = false);
    this.buildFilterQueryParamsAndNavigate(this.filterSource);
  }

  chipClick(index: number) {
    const value = (this.desktopFilterForm.get('tags') as FormArray).controls[index]
      .value;
      this.filterSource.tags = this.filterSource.tags.map(
        (item, idx) => index === idx ? { ...item, selected: !value} : { ...item,}
      );
    (this.desktopFilterForm.get('tags') as FormArray).setValue([...this.filterSource.tags.map(tag=>tag.selected)]);
    (this.desktopFilterForm.get('tags') as FormArray).updateValueAndValidity();
    
  }

  checkCurrentValue(index: number) {
    return (this.desktopFilterForm.get('tags') as FormArray).controls[index].value;
  }

  private renderForm() {
    if (this.filterSource) {
      this.filterSource.categories = this.filterSource.categories.filter(category=>{
        return !SPECIAL_CATEGORIES.includes(category.type);
      });
        this.desktopFilterForm = this.fb.group({
          categories: new FormArray(
            this.filterSource.categories.map((item) => new FormControl(item))
          ),
          tags: new FormArray(
            this.filterSource.tags.map((item) => new FormControl(item.selected))
          ),
          locations: new FormArray(
            this.filterSource.locations.map((item) => new FormControl(item))
          ),
        });
    }
  }

  public selectCategory(value, idx) {
    const formArray = (this.desktopFilterForm.controls.categories as FormArray).controls;
    formArray.forEach((item, index) => {
      // logic for clearing other category selections on selecting in a different category
      if (index != idx && value) {
        item.setValue({ ...item.value,
          selected: false,
          children: item.value.children.map(child => ({ ...child, selected: false }))
        }, { emitEvent: false });
      }
    })
  }

  public locationClick(value:any, index:number){
      this.filterSource.locations = this.filterSource.locations.map(
        (item, idx) => index === idx ? { ...item, selected: value} : { ...item}
      );
    (this.desktopFilterForm.get('locations') as FormArray).setValue([...this.filterSource.locations]);
    (this.desktopFilterForm.get('locations') as FormArray).updateValueAndValidity();
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
    if(!this.isNearbyFilter) {
      this.route.navigate(['catalog-page'], { queryParams: queryParams });
    } else {
      this.route.navigate(['nearby'], { queryParams: queryParams });
    }
    
  }

}
