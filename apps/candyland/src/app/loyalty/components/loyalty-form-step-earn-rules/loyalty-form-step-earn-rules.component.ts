import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-loyalty-form-step-earn-rules',
  templateUrl: './loyalty-form-step-earn-rules.component.html',
  styleUrls: ['./loyalty-form-step-earn-rules.component.scss']
})
export class LoyaltyFormStepEarnRulesComponent implements OnInit {
  @Input() public customTierDataSource: CustomDataSource<ICustomTireForm>;
  @Input() public basicTierId: string;
  @Input() public basicTierRuleSet: ILoyaltyRuleSet;
  @Input() public customTierRuleSetMap: {[id: string]: ILoyaltyRuleSet};
  @Input() public loader: boolean;
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public ngOnInit(): void {
  }

  public handleTiersAction(actionData: { action: NewLoyaltyActions, data?: any }): void {
    this.rulesAction.emit(actionData);
  }

  public getCustomTierRuleSet(id: string): any | null {
    const condition = this.customTierRuleSetMap && id && id in this.customTierRuleSetMap && this.customTierRuleSetMap[id];
    return condition ? this.customTierRuleSetMap[id] : null;
  }
}
