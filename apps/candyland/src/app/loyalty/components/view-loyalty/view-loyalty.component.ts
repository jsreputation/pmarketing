import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-view-loyalty',
  templateUrl: './view-loyalty.component.html',
  styleUrls: ['./view-loyalty.component.scss']
})
export class ViewLoyaltyComponent implements OnInit {
  @Input() public loyaltyData: any;

  public ngOnInit(): void {
  }

  public get schemaInf(): any {
    if (this.loyaltyData) {
      return {
        ...this.loyaltyData.name,
        ...this.loyaltyData.stepDetails
      };
    }
  }

  public get stepTiers(): any {
    if (this.loyaltyData) {
      return {
        ...this.loyaltyData.stepTiers
      };
    }
  }

}
