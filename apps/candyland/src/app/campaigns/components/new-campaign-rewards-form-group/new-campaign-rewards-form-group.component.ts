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
import { ICampaignRewardsList } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy {
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  public rewards: ICampaignRewardsList[] = [];
  private isFirstInit: boolean;
  private noOutCome: { probability: 0, outcomeId: '', limit: '', id: '' };
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
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.rewardsListCollection && this.isFirstInit;
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
          this.addReward(reward);
        }
      });
  }

  public initRewardsList(): void {
    const noOutcome = this.campaign.rewardsListCollection.find(outcomeData => !outcomeData.outcome.resultId);
    this.noOutCome = {
      probability: noOutcome && noOutcome.outcome && noOutcome.outcome.probability || 0,
      outcomeId: noOutcome && noOutcome.outcome && noOutcome.outcome.id,
      limit: '',
      id: ''
    };

    const possibleOutcomes = this.campaign.rewardsListCollection.filter(
      data => {
        if (!this.slotNumber) {
          return true;
        }
        return data.outcome.lootBoxId === this.slotNumber;
      }
    ).filter(data => data.outcome.resultId)
      .map(data =>
        this.rewardsService.getReward(data.outcome.resultId).pipe(
          map((reward: IRewardEntity) =>
            ({ ...reward, probability: data.outcome.probability, outcomeId: data.outcome.id, limit: data.outcome.limit })),
          catchError(() => of(null))
        ));
    combineLatest(...possibleOutcomes).subscribe(
      (rewards: Partial<IRewardEntity>[]) => {
        rewards.filter(data => data).map((reward: IRewardEntity) => this.updateReward(reward));
        this.updateRewardsInCampaign();
      }
    );
  }

  public addReward(value: IRewardEntity): void {
    this.rewards.push(this.createRewardFormGroup(value));
    this.cd.detectChanges();
  }

  public updateReward(value: IRewardEntity): void {
    if ((value.probability || value.probability === 0) && !this.enableProbability) {
      this.enableProbability = true;
    }
    const newReward = this.createRewardFormGroup(value);
    this.rewards.push(newReward);
    this.cd.detectChanges();
  }

  public updateRewardsInCampaign(): void {
    console.log(this.rewards);
  }

  public updateRewardData(index: number, value: { probability: number, limit: number }): void {
    this.rewards[index] = { ... this.rewards[index], ...value };
  }

  public removeReward(index: number): void {
    if (index > -1) {
      this.rewards.splice(index, 1);
    }
  }

  private createRewardFormGroup(value: IRewardEntity): ICampaignRewardsList {
    return {
      rewardsOptions: value || { ...this.noOutCome }
    };
  }

  public updateProbability(checked: boolean): void {
    this.enableProbability = checked;
    this.updateRewards();
  }

  private updateRewards(): void {
    if (this.enableProbability) {
      this.rewards.unshift(this.createRewardFormGroup(null));
    } else {
      this.rewards.shift();
    }
    this.cd.detectChanges();
  }
}
