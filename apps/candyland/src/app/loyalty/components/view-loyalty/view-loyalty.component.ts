import { Component, Input } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-view-loyalty',
  templateUrl: './view-loyalty.component.html',
  styleUrls: ['./view-loyalty.component.scss']
})
export class ViewLoyaltyComponent {
  @Input() public loyaltyData: ILoyaltyForm;
  @Input() public dataSource: CustomDataSource<any>;

  public get schemaInf(): ILoyaltySchemaInf {
    if (this.loyaltyData) {
      return {
        name: this.loyaltyData.name,
        status: this.loyaltyData.status,
        ...this.loyaltyData.stepDetails
      };
    }
  }

  public get stepTiersConversions(): ILoyaltyTiersConversions {
    if (this.loyaltyData) {
      return {
        ...this.loyaltyData.tiersConversions
      };
    }
  }

}
