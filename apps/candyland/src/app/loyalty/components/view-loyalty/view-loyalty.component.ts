import { Component, Input } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-view-loyalty',
  templateUrl: './view-loyalty.component.html',
  styleUrls: ['./view-loyalty.component.scss']
})
export class ViewLoyaltyComponent {
  @Input() public loyaltyData: ILoyaltyForm;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;
}
