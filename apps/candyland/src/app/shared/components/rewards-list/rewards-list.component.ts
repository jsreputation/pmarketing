import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { RewardsTableMenuActions } from '../../../rewards/rewards-actions/rewards-table-menu-actions';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

@Component({
  selector: 'cl-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  @Input() public dataSource: CustomDataSource<IRewardEntity[]>;
  @Input() public displayedColumns: string[] = [
    'image',
    'rewardType',
    'category',
    'validity',
    // temporarily hide balance as it is not available from the api yet
    'balance',
    'actions'
  ];
  @Input() public selectable: boolean = false;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public itemAction: EventEmitter<{ action: RewardsTableMenuActions, data: IRewardEntity }>
    = new EventEmitter<{ action: RewardsTableMenuActions, data: IRewardEntity }>();
  @Output() public selectReward: EventEmitter<IRewardEntity> = new EventEmitter<IRewardEntity>();
  @Output() public clickDetailReward: EventEmitter<IRewardEntity> = new EventEmitter<IRewardEntity>();
  public selected: IRewardEntity;

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public selectItem(item: IRewardEntity): void {
    if (this.selectable) {
      this.selected = item;
      this.selectReward.emit(item);
    }
  }

  public clickDetailItem(item: IRewardEntity): void {
    if (!this.selectable) {
      this.clickDetailReward.emit(item);
    }
  }

  public isSelected(item: IRewardEntity): boolean {
    return this.selected && item.id === this.selected.id;
  }

  public editItem(reward: IRewardEntity): void {
    this.itemAction.emit({ action: RewardsTableMenuActions.edit, data: reward });
  }

  public duplicateItem(reward: IRewardEntity): void {
    this.itemAction.emit({ action: RewardsTableMenuActions.duplicate, data: reward });
  }

  public deleteItem(reward: IRewardEntity): void {
    this.itemAction.emit({ action: RewardsTableMenuActions.delete, data: reward });
  }

  public useAsCaptionItem(reward: IRewardEntity): void {
    this.itemAction.emit({ action: RewardsTableMenuActions.useAsCaption, data: reward });
  }
}
