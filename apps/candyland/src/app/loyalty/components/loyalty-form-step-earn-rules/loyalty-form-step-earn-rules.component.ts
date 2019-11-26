import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-loyalty-form-step-earn-rules',
  templateUrl: './loyalty-form-step-earn-rules.component.html',
  styleUrls: ['./loyalty-form-step-earn-rules.component.scss']
})
export class LoyaltyFormStepEarnRulesComponent implements OnInit {
  @Input() public customTierDataSource: CustomDataSource<any>;
  @Input() public basicTierId: any;
  @Input() public basicTierRuleSet: any;
  @Input() public customTierRuleSetMap: any;
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
