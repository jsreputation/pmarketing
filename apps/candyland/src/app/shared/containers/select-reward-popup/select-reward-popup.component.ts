import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RewardsService } from '@cl-core/services';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

@Component({
  selector: 'cl-select-reward-popup',
  templateUrl: './select-reward-popup.component.html',
  styleUrls: ['./select-reward-popup.component.scss']
})
export class SelectRewardPopupComponent {
  public dataSource: CustomDataSource<IRewardEntity>;
  public displayedColumns: string[] = [
    'image',
    'name',
    'rewardType',
    'category',
    //  'balance'
  ];
  public selectedReward: IRewardEntity;

  constructor(
    public dialogRef: MatDialogRef<SelectRewardPopupComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private rewardsService: RewardsService,
    public cd: ChangeDetectorRef
  ) {
    this.dataSource = new CustomDataSource<IRewardEntity>(this.rewardsService);
  }

  public selectReward(reward: IRewardEntity): void {
    this.selectedReward = reward;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    if (this.selectedReward) {
      this.dialogRef.close(this.selectedReward);
    }
  }
}
