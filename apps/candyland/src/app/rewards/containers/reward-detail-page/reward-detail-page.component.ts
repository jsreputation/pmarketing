import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RewardService} from '@cl-core/http-services/reward.service';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {CreateEngagementPopupComponent} from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import {map, tap} from 'rxjs/operators';
import {PrepareTableFilers} from '@cl-helpers/prepare-table-filers';

@Component({
  selector: 'cl-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<any>();
  public data;
  public statusFilterConfig: OptionConfig[];

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;


  constructor(private rewardsService: RewardService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogReplenish(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData() {
    this.rewardsService.getReward()
      .pipe(
        map((data: any) => {
            data.campaigns.map(item => {
              item.begin = new Date(item.begin);
              item.end = new Date(item.end);
              return item;
            });
            return data;
          }
        ),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data.campaigns, 'status');
          this.statusFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(counterObject, data.campaigns);
        })
      )
      .subscribe((res: any) => {
        this.data = res;
        console.log(res);
        this.dataSource.data = res.campaigns;
        this.cd.detectChanges();
      });
  }

}
