import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-tiers-group',
  templateUrl: './tiers-group.component.html',
  styleUrls: ['./tiers-group.component.scss']
})
export class TiersGroupComponent {

  @Input() public editable: boolean = false;
  @Input() public dataSource: CustomDataSource<any>;
  @Input() public displayedColumns: string[] = ['name', 'joinMethod', 'earnBonus', 'burnDiscount', 'pointsExpiry'];
  @Output() public tiersAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public get displayedColumnsWithEdit(): string[] {
    if (this.editable) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }

  public editItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.editTier, data: tier});
  }

  public duplicateItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.duplicateTier, data: tier});
  }

  public deleteItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.deleteTier, data: tier});
  }

  public createTier(): void {
    this.tiersAction.emit({action: NewLoyaltyActions.createTier});
  }
}
