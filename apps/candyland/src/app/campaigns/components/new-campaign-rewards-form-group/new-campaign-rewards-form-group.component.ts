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
  public outcomes: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  private destroy$: Subject<void> = new Subject();
  public enableProbability: boolean = false;

  public get sumMoreThanError(): boolean {
    const totalNum = this.outcomes.reduce((total, item) => {
      if (item.outcome.probability) {
        total += item.outcome.probability;
      }
      return total;
    }, 0);
    return totalNum > 100;
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
          this.initOutcomesList();
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
          this.addOutcome({
            outcome: {
              probability: 0,
              limit: null,
              resultId: Number.parseInt(reward.id, 10),
              resultType: 'Ros::Reward::Entity'
            },
            reward
          });
          this.updateOutcomesInCampaign();
        }
      });
  }

  public initOutcomesList(): void {
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
        rewards.filter(data => data).map((outcome: ICampaignOutcome) => this.addOutcome(outcome));
        this.updateOutcomesInCampaign();
      }
    );
  }

  public addOutcome(value: ICampaignOutcome): void {
    if (value.outcome.probability > 0 && !this.enableProbability) {
      this.enableProbability = true;
    }
    this.outcomes.push(value);
    this.updateOutcomeProbabilitySetting();
    this.cd.detectChanges();
  }

  public updateOutcomesInCampaign(): void {
    const otherSlotOutcomes = this.campaign.outcomes && this.campaign.outcomes.length > 0 ?
      this.campaign.outcomes.filter(
        outcomeData => outcomeData.outcome.slotNumber !== this.slotNumber && outcomeData.outcome.slotNumber >= 0
      ) : [];
    this.campaign.outcomes = [...otherSlotOutcomes, ...this.outcomes];
  }

  public updateOutcomeData(index: number, value: { probability: number, limit: number }): void {
    this.outcomes[index].outcome.probability = value.probability;
    this.outcomes[index].outcome.limit = value.limit;
    this.updateOutcomesInCampaign();
  }

  public removeOutcome(index: number): void {
    if (index > -1) {
      this.outcomes[index].outcome.slotNumber = -1;
    }
    this.updateOutcomesInCampaign();
  }

  public updateProbability(checked: boolean): void {
    this.enableProbability = checked;
    this.updateOutcomes();
  }

  private updateOutcomes(): void {
    if (this.enableProbability) {
      const noOutcome = {
        outcome: {
          probability: 0,
          slotNumber: this.slotNumber
        }
      };
      this.outcomes.unshift(noOutcome);
    } else {
      this.outcomes.shift();
    }
    this.updateOutcomeProbabilitySetting();
    this.cd.detectChanges();
  }

  private updateOutcomeProbabilitySetting(): void {
    this.outcomes.forEach(outcomeData => outcomeData.enableProbability = this.enableProbability);
  }
}
