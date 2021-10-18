import { Component, Input } from '@angular/core';
import { filterModel } from '../../../models/filter.model';
import { FilterService } from '../../../shared/services/filter.service';

@Component({
    selector: 'bdo-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
    @Input() title: string;
    @Input() dataSource: filterModel[] =[];

    constructor(public filterService: FilterService) {
    }

    execCallBack(callBack: () => void) {
        callBack();
    }

    filter() {
        this.filterService.showFilterDialog();
    }
}
