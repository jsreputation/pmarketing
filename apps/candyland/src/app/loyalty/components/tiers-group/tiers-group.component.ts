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
    qualification: {
      pointsThreshold: true,
      points: 500
    },
    earnBonus: 20,
    burnRule: 10,
    pointsExpiry: {
      amount: 3,
      type: 'day',
      trigger: 'earned',
    }
  },
    {
      name: 'Gold',
      qualification: {
        inviteOnly: true,
      },
      earnBonus: 20,
      burnRule: 10,
      pointsExpiry: {
        amount: 3,
        type: 'day',
        trigger: 'earned',
      }
    }];
  @Input() public displayedColumns: string[] = ['name', 'qualification', 'earnBonus', 'burnRule', 'pointsExpiry', 'actions'];
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
