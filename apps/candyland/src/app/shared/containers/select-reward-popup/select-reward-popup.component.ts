import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { RewardService } from '@cl-core/http-services/reward.service';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cl-select-reward-popup',
  templateUrl: './select-reward-popup.component.html',
  styleUrls: ['./select-reward-popup.component.scss']
})
export class SelectRewardPopupComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Reward>();
  public selectedReward: Reward;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SelectRewardPopupComponent>,
              private rewardsService: RewardService,
              public cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public selectReward(reward: Reward): void {
    this.selectedReward = reward;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.dialogRef.close(this.selectedReward);
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
        this.cd.detectChanges();
      });
  }
}
