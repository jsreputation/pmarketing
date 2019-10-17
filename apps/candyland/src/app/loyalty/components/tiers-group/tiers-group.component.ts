import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';

@Component({
  selector: 'cl-tiers-group',
  templateUrl: './tiers-group.component.html',
  styleUrls: ['./tiers-group.component.scss']
})
export class TiersGroupComponent implements AfterViewInit {

  public dataSource: MatTableDataSource<any>;
  @Input() public data: any = [{
    name: 'Silver',
    joinMethod: {
      pointsThreshold: true,
      points: 500
    },
    earnBonus: 20,
    burnDiscount: 10,
    pointsExpiry: {
      amount: 3,
      type: 'day',
      trigger: 'accural',
    }
  },
    {
      name: 'Gold',
      joinMethod: {
        inviteOnly: true,
      },
      earnBonus: 20,
      burnDiscount: 10,
      pointsExpiry: {
        amount: 3,
        type: 'day',
        trigger: 'accural',
      }
    }];
  @Input() public displayedColumns: string[] = ['name', 'joinMethod', 'earnBonus', 'burnDiscount', 'pointsExpiry', 'actions'];
  @Output() public tiersAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  public ngAfterViewInit(): void {
    this.dataSource.data = this.data;
  }

  public editItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.editTier, data: tier});
  }

  public duplicateItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.duplicateTier, data: tier});
  }

  public deleteItem(tier: any): void {
    this.tiersAction.emit({action: NewLoyaltyActions.duplicateTier, data: tier});
  }

  public createTier(): void {
    this.tiersAction.emit({action: NewLoyaltyActions.createTier});
  }
}
