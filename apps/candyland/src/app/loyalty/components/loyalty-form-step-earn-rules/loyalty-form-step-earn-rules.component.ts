import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-loyalty-form-step-earn-rules',
  templateUrl: './loyalty-form-step-earn-rules.component.html',
  styleUrls: ['./loyalty-form-step-earn-rules.component.scss']
})
export class LoyaltyFormStepEarnRulesComponent implements OnInit {
  @Input() public basicTierId: any;
  @Input() public basicTierRuleSet: any;
  @Input() public rules?: any;
  @Input() public customTierDataSource: CustomDataSource<any>;
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public ngOnInit(): void {
  }

  public handleTiersAction(data: { action: NewLoyaltyActions, data?: any }): void {
    this.rulesAction.emit(data);
  }

  public createRule(tierId: string, tierType: string = 'basicTier'): void {
    this.rulesAction.emit({action: NewLoyaltyActions.createRule, data: {tierId, tierType}});
  }

}
