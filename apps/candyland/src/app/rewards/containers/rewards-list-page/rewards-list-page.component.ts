import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {PrepareTableFilers} from '@cl-helpers/prepare-table-filers';
import {CreateEngagementPopupComponent} from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import {RewardService} from '@cl-core/http-services/reward.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'cl-rewards-list-page',
  templateUrl: './rewards-list-page.component.html',
  styleUrls: ['./rewards-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsListPageComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<Engagement>();
  public hasData = true;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private rewardsService: RewardService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData() {
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
