import { Component, Input, OnInit } from '@angular/core';
import { LIST_CATALOG_CATEGORIES } from '../../../mock-data/catalog-category';
import { CategoryModel, CategoryModelSelected, SubCategory } from '../../../models/category.model';


@Component({
    selector: 'bdo-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    @Input() categoryCode = "";
    @Input() subCategoryCodeSelected: SubCategory[] =[];
    lstAllCatalogCategory = LIST_CATALOG_CATEGORIES;
    categorySelected: CategoryModelSelected = {};
    category: CategoryModel= {};
    
    ngOnInit(): void {
        
        const index = this.lstAllCatalogCategory.findIndex(item => item.code == this.categoryCode);
        if (index > -1) {
            this.categorySelected  = {...this.lstAllCatalogCategory[index]};
            this.categorySelected.subCategories = this.categorySelected.subCategories.map(element=>{
                const indexSub =this.subCategoryCodeSelected.findIndex(subCode => subCode.code == element.code);
                element.selected = false;
                element.cardType?.map(item=>{
                    item.selected = false;
                })
                if(indexSub > -1){
                    element.selected = true;
                }
                return element;
            })
        }
    }
    execCallBack(callBack: () => void) {
        callBack();
    }
    
}
