import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-loyalty-form-step-tiers-conversions',
  templateUrl: './loyalty-form-step-tiers-conversions.component.html',
  styleUrls: ['./loyalty-form-step-tiers-conversions.component.scss']
})
export class LoyaltyFormStepTiersConversionsComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public config: any;
  @Input() public customTierDataSource: CustomDataSource<ICustomTireForm>;
  @Output() public tiersConversionsAction: EventEmitter<{ action: NewLoyaltyActions, data?: ICustomTireForm }> = new EventEmitter();

  public ngOnInit(): void {
  }

  public handleTiersAction(data: { action: NewLoyaltyActions, data?: ICustomTireForm }): void {
    this.tiersConversionsAction.emit(data);
  }

}
