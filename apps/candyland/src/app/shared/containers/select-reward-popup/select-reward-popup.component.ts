import { ChangeDetectorRef, Component} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RewardsService } from '@cl-core/services';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-select-reward-popup',
  templateUrl: './select-reward-popup.component.html',
  styleUrls: ['./select-reward-popup.component.scss']
})
export class SelectRewardPopupComponent {
  public dataSource: CustomDataSource<IRewardEntity>;
  public displayedColumns = ['image', 'rewardType', 'category', 'balance'];
  public selectedReward: IRewardEntity;

  // @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SelectRewardPopupComponent>,
              private rewardsService: RewardsService,
              public cd: ChangeDetectorRef) {
    this.dataSource = new CustomDataSource<IRewardEntity>(this.rewardsService);
  }

  // public ngOnInit(): void {
  //   this.getData();
  // }

  // public ngAfterViewInit(): void {
  //   this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  //   if (this.paginator) {
  //     this.dataSource.paginator = this.paginator;
  //   }
  // }

  public selectReward(reward: IRewardEntity): void {
    this.selectedReward = reward;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    this.dialogRef.close(this.selectedReward);
  }

  // private getData(): void {
  //   this.rewardsService.getRewards()
  //     .pipe(
  //       map((data: any[]) => (
  //           data.map(item => {
  //             item.begin = new Date(item.begin);
  //             item.end = new Date(item.end);
  //             return item;
  //           })
  //         )
  //       )
  //     )
  //     .subscribe((res: any[]) => {
  //       this.dataSource.data = res;
  //       this.cd.detectChanges();
  //     });
  // }
}
