import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { combineLatest, of, Subject } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { RewardsService } from '@cl-core/services/rewards.service';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { sum } from '@cl-helpers/total-sum';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy {
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  public rewards: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  private destroy$: Subject<void> = new Subject();
  public enableProbability: boolean = false;

  public get sumMoreThanError(): boolean {
    return sum(this.rewards, 'probability') > 100;
  }

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private store: CampaignCreationStoreService,
    private rewardsService: RewardsService
  ) {
  }

  public get campaign(): any {
    return this.store.currentCampaign;
  }

  public ngOnInit(): void {
    this.isFirstInit = true;
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.outcomes && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.initRewardsList();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDialogSelectReward(): void {
    this.dialog
      .open<SelectRewardPopupComponent, void, IRewardEntity>(SelectRewardPopupComponent)
      .afterClosed()
      .subscribe((reward: IRewardEntity) => {
        if (reward) {
          this.addReward({
            outcome: {
              probability: 0,
              limit: null,
              resultId: Number.parseInt(reward.id, 10),
              resultType: 'Ros::Reward::Entity'
            },
            reward
          });
        }
      });
  }

  public initRewardsList(): void {
    const possibleOutcomes = this.campaign.outcomes.filter(
      data => {
        if (!this.slotNumber) {
          return true;
        }
        return data.outcome.slotNumber === this.slotNumber;
      }
    ).filter(data => data.outcome.resultId)
      .map(data =>
        this.rewardsService.getReward(data.outcome.resultId).pipe(
          map((reward: IRewardEntity) =>
            ({ ...data, reward })),
          catchError(() => of(null))
        ));
    combineLatest(...possibleOutcomes).subscribe(
      (rewards: ICampaignOutcome[]) => {
        rewards.filter(data => data).map((outcome: ICampaignOutcome) => this.addReward(outcome));
        this.updateRewardsInCampaign();
      }
    );
  }

  public addReward(value: ICampaignOutcome): void {
    if (value.enableProbability && !this.enableProbability) {
      this.enableProbability = true;
    }
    this.rewards.push(value);
    this.cd.detectChanges();
  }

  public updateRewardsInCampaign(): void {
    console.log(this.rewards);
  }

  public updateRewardData(index: number, value: { probability: number, limit: number }): void {
    this.rewards[index].outcome = { ... this.rewards[index].outcome, ...value };
  }

  public removeReward(index: number): void {
    if (index > -1) {
      this.rewards.splice(index, 1);
    }
  }

  public updateProbability(checked: boolean): void {
    this.enableProbability = checked;
    this.updateRewards();
  }

  private updateRewards(): void {
    if (this.enableProbability) {
      const noOutcome = {
        outcome: {
          probability: 0,
          slotNumber: this.slotNumber
        }
      };
      this.rewards.unshift(noOutcome);
    } else {
      this.rewards.shift();
    }
    this.cd.detectChanges();
  }
}
