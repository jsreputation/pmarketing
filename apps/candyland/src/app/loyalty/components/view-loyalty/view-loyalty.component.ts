import { Component, Input } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { StatusLabelConfig } from '@cl-shared';
import { ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-view-loyalty',
  templateUrl: './view-loyalty.component.html',
  styleUrls: ['./view-loyalty.component.scss']
})
export class ViewLoyaltyComponent {
  @Input() public loyaltyData: ILoyaltyForm;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;
  @Input() public basicTierRuleSet: ILoyaltyRuleSet;
  @Input() public customTierRuleSetMap: { [id: string]: ILoyaltyRuleSet };
  @Input() public statusLabel: { [key: string]: StatusLabelConfig };

  public getCustomTierRuleSet(id: string): ILoyaltyRuleSet | null {
    const condition = id
      && this.customTierRuleSetMap
      && id in this.customTierRuleSetMap
      && this.customTierRuleSetMap[id]
      && this.customTierRuleSetMap[id].rules.length > 0;
    return condition ? this.customTierRuleSetMap[id] : null;
  }
}
