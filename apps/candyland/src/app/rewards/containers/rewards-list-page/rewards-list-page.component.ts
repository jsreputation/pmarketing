import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { Router } from '@angular/router';
import { RewardsService } from '@cl-core/services';
import { switchMap } from 'rxjs/operators';
import { RewardsTableMenuActions } from '../../rewards-actions/rewards-table-menu-actions';

@Component({
  selector: 'cl-rewards-list-page',
  templateUrl: './rewards-list-page.component.html',
  styleUrls: ['./rewards-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsListPageComponent {
  public dataSource: CustomDataSource<IRewardEntity>;
  public displayedColumns = ['name', 'rewardType', 'category', 'validity', 'balance', 'actions'];
  public hasData = true;

  constructor(private rewardsService: RewardsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private router: Router) {
    this.dataSource = new CustomDataSource<IRewardEntity>(this.rewardsService);
  }

  public actionHandler(action: { action: RewardsTableMenuActions, data: IRewardEntity }): void {
    switch (action.action) {
      case RewardsTableMenuActions.edit: {
        this.editReward(action.data);
        break;
      }
      case RewardsTableMenuActions.duplicate: {
        this.duplicateReward(action.data);
        break;
      }
    }
  }

  private editReward(reward: IRewardEntity): void {
    this.router.navigate(['/rewards/edit', reward.id], {state: reward});
  }

  private duplicateReward(reward: IRewardEntity): void {
    this.rewardsService.getReward(reward.id).pipe(
      switchMap(responseReward => this.rewardsService.createReward(responseReward))
    ).subscribe(() => this.dataSource.updateData());
  }
}
