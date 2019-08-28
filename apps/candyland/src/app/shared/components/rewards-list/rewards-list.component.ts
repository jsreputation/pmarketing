import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { RewardsTableMenuActions } from '../../../rewards/rewards-actions/rewards-table-menu-actions';

@Component({
  selector: 'cl-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements AfterViewInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<Reward[]>;
  @Input() public displayedColumns = ['image', 'rewardType', 'category', 'validity', 'balance', 'actions'];
  @Input() public selectable = false;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter<{action: RewardsTableMenuActions, data: Reward}>();
  @Output() public selectReward = new EventEmitter<Reward>();
  public selected;

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public selectItem(item: Reward): void {
    this.selected = item;
    this.selectReward.emit(item);
  }

  public isSelected(item: Reward): boolean {
    return this.selected && item.id === this.selected.id;
  }

  public editItem(reward: Reward): void {
    this.itemAction.emit({action: RewardsTableMenuActions.edit, data: reward});
  }

  public duplicateItem(reward: Reward): void {
    this.itemAction.emit({action: RewardsTableMenuActions.duplicate, data: reward});
  }

  public deleteItem(reward: Reward): void {
    this.itemAction.emit({action: RewardsTableMenuActions.delete, data: reward});
  }

  public useAsCaptionItem(reward: Reward): void {
    this.itemAction.emit({action: RewardsTableMenuActions.useAsCaption, data: reward});
  }

}
