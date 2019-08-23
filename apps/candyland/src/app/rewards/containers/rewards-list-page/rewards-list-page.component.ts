import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {PrepareTableFilers} from '@cl-helpers/prepare-table-filers';
import {CreateEngagementPopupComponent} from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { RewardsService } from '@cl-core/services/rewards.service';
import { RewardsTableMenuActions } from '../../rewards-actions/rewards-table-menu-actions';

@Component({
  selector: 'cl-rewards-list-page',
  templateUrl: './rewards-list-page.component.html',
  styleUrls: ['./rewards-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsListPageComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<any>();
  public hasData = true;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private rewardsService: RewardsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private router: Router) {
  }

  public ngAfterViewInit(): void {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }
  // tslint:disable
  public actionHandler(action: {action: RewardsTableMenuActions, data: Reward}): void {
    const listActions = {
      [RewardsTableMenuActions.edit]: this.editReward.bind(this)
    };
    (typeof listActions[action.action] === 'function') && listActions[action.action](action.data);
  }

  private editReward(reward: Reward): void {
    this.router.navigate(['/rewards/edit', reward.id], {state: reward});
  }

  private getData(): void {
    this.rewardsService.getRewards()
      .pipe(
        map((data: any[]) => (
            data.map(item => {
              item.begin = new Date(item.begin);
              item.end = new Date(item.end);
              return item;
            })
          )
        )
      )
      .subscribe((res: any[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
