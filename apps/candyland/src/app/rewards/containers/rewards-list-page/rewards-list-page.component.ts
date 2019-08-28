import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { Router } from '@angular/router';
import { RewardsService } from '@cl-core/services';
import { RewardsTableMenuActions } from '../../rewards-actions/rewards-table-menu-actions';

@Component({
  selector: 'cl-rewards-list-page',
  templateUrl: './rewards-list-page.component.html',
  styleUrls: ['./rewards-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsListPageComponent {
  public dataSource: CustomDataSource<Reward>;
  public hasData = true;

  constructor(private rewardsService: RewardsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private router: Router) {
    this.dataSource = new CustomDataSource<Reward>(this.rewardsService);
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  // tslint:disable
  public actionHandler(action: { action: RewardsTableMenuActions, data: Reward }): void {
    const listActions = {
      [RewardsTableMenuActions.edit]: this.editReward.bind(this)
    };
    (typeof listActions[action.action] === 'function') && listActions[action.action](action.data);
  }

  private editReward(reward: Reward): void {
    this.router.navigate(['/rewards/edit', reward.id], {state: reward});
  }
}
