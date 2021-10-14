import { Component, Input } from '@angular/core';
import { filterModel } from '../../../models/filter.model';

@Component({
    selector: 'bdo-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
    @Input() title: string;
    @Input() dataSource: filterModel[] =[];
    execCallBack(callBack: () => void) {
        callBack();
    }
}
