import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-loyalty-rule-card',
  templateUrl: './loyalty-rule-card.component.html',
  styleUrls: ['./loyalty-rule-card.component.scss']
})
export class LoyaltyRuleCardComponent {
  @Input() public editable: boolean = true;
  @Input() public tierId: string;
  @Input() public tierType: string = 'basicTier';
  @Input() public tierName: string;
  @Input() public ruleSet: ILoyaltyRuleSet;
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public handleTiersAction(data: { action: NewLoyaltyActions, data?: any }): void {
    this.rulesAction.emit(data);
  }

  public createRule(ruleSet: any): void {
    this.rulesAction.emit({action: NewLoyaltyActions.createRule, data: {ruleSet}});
  }

}
