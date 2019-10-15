import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';

@Component({
  selector: 'cl-loyalty-form-step-tiers-conversions',
  templateUrl: './loyalty-form-step-tiers-conversions.component.html',
  styleUrls: ['./loyalty-form-step-tiers-conversions.component.scss']
})
export class LoyaltyFormStepTiersConversionsComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public currency: string;
  @Output() public tiersConversionsAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public ngOnInit(): void {
  }

  public handleTiersAction(data: { action: NewLoyaltyActions, data?: any }): void {
    this.tiersConversionsAction.emit(data);
  }

}
