import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyPointsExpireTrigger } from '../../models/loyalty-points-expire-trigger.enum';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-tiers-group',
  templateUrl: './tiers-group.component.html',
  styleUrls: ['./tiers-group.component.scss']
})
export class TiersGroupComponent {
  @Input() public editable: boolean = false;
  @Input() public dataSource: CustomDataSource<ICustomTireForm>;
  @Input() public displayedColumns: string[] = ['name', 'joinMethod', 'earnBonus', 'burnDiscount', 'pointsExpiry'];
  @Output() public tiersAction: EventEmitter<{ action: NewLoyaltyActions, data?: ICustomTireForm }> = new EventEmitter();

  public pointsExpireTrigger: typeof LoyaltyPointsExpireTrigger = LoyaltyPointsExpireTrigger;

  public get displayedColumnsWithEdit(): string[] {
    if (this.editable) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }

  public editItem(tier: ICustomTireForm): void {
    this.tiersAction.emit({action: NewLoyaltyActions.editTier, data: tier});
  }

  public duplicateItem(tier: ICustomTireForm): void {
    this.tiersAction.emit({action: NewLoyaltyActions.duplicateTier, data: tier});
  }

  public deleteItem(tier: ICustomTireForm): void {
    this.tiersAction.emit({action: NewLoyaltyActions.deleteTier, data: tier});
  }

  public createTier(): void {
    this.tiersAction.emit({action: NewLoyaltyActions.createTier});
  }
}
