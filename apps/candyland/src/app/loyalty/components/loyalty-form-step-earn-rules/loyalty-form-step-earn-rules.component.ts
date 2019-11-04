import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-loyalty-form-step-earn-rules',
  templateUrl: './loyalty-form-step-earn-rules.component.html',
  styleUrls: ['./loyalty-form-step-earn-rules.component.scss']
})
export class LoyaltyFormStepEarnRulesComponent implements OnInit {
  @Input() public rules?: any;
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: ICustomTireForm }> = new EventEmitter();

  public ngOnInit(): void {
  }

  public handleTiersAction(data: { action: NewLoyaltyActions, data?: ICustomTireForm }): void {
    this.rulesAction.emit(data);
  }

  public createRule(): void {
    this.rulesAction.emit({action: NewLoyaltyActions.createRule});
  }

}
