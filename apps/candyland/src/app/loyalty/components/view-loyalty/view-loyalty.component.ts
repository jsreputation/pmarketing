import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-view-loyalty',
  templateUrl: './view-loyalty.component.html',
  styleUrls: ['./view-loyalty.component.scss']
})
export class ViewLoyaltyComponent implements OnInit {
  @Input() public loyaltyData: ILoyaltyForm;

  public ngOnInit(): void {
  }

  public get schemaInf(): ILoyaltySchemaInf {
    if (this.loyaltyData) {
      return {
        name: this.loyaltyData.name,
        status: this.loyaltyData.status,
        ...this.loyaltyData.details
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
