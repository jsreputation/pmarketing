import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input, OnChanges, SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormGroup
} from '@angular/forms';
import { MatDialog } from '@angular/material';

import {
  combineLatest,
  of, Subject,
} from 'rxjs';
import {
  map,
  catchError,
  takeUntil,
} from 'rxjs/operators';

import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign';
import { RewardsService } from '@cl-core/services/rewards.service';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { SOURCE_TYPE } from '../../../app.constants';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  @Input() public enableProbability: boolean = false;

  private destroy$: Subject<void> = new Subject();

  @Input() public formParent: FormGroup | AbstractControl; // turn into an input
  @Input() public isSpinEngagement: boolean = false;

  public outcomes: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  public sumMoreThanError: boolean = false;

  public noOutcome: ICampaignOutcome = {
    outcome: {
      limit: null,
      probability: 0,
      slotNumber: -1
    }
  };

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public store: CampaignCreationStoreService,
    private rewardsService: RewardsService,
  ) {
  }

  public get campaign(): any {
    return this.store.currentCampaign;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.isFirstInit && this.outcomes.length !== 0 && changes.enableProbability !== undefined &&
      (changes.enableProbability.currentValue !== changes.enableProbability.previousValue)) {
      this.updateOutcomes();
    }
  }

  public ngOnInit(): void {
    this.isFirstInit = true;
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const isCreateNew = data && !data.id && data.campaignInfo && this.isFirstInit;
        const isFirstTimeRenderFromEdit = data && data.id && data.template && data.template.id && data.outcomes && this.isFirstInit;
        if (isCreateNew || isFirstTimeRenderFromEdit) {
          this.isFirstInit = false;
          this.initOutcomesList();
          this.updateOutcomes();
          this.cd.detectChanges();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cd.detach();
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
              resultType: SOURCE_TYPE,
              slotNumber: this.slotNumber
            },
            reward
          });
          this.isSpinEngagement ?
            (this.updateSlotCount().updateSumMoreThanCheck()) : (this.sumMoreThanError = this.updateSumMoreThanCheck());
          this.updateOutcomesInCampaign();
        }
      });
  }

  public initOutcomesList(): void {
    const noOutcomeData = this.campaign.outcomes && this.campaign.outcomes.find(
      data => data.outcome.slotNumber === this.slotNumber && !data.outcome.resultId);
    if (noOutcomeData && noOutcomeData.outcome) {
      this.outcomes = [noOutcomeData];
    } else {
      this.outcomes = [this.noOutcome];
    }

    const possibleOutcomes = this.campaign.outcomes && this.campaign.outcomes.filter(
      data => {
        if (!data.outcome.resultId) {
          return false;
        }
        if (!this.slotNumber) {
          return true;
        }
        return data.outcome.slotNumber === this.slotNumber;
      }
    );
    const possibleOutcomes$ = possibleOutcomes && possibleOutcomes.map(data =>
      this.rewardsService.getReward(data.outcome.resultId).pipe(
        map((reward: IRewardEntity) =>
          ({ ...data, reward })),
        catchError(() => of(null))
      ));
    combineLatest(...possibleOutcomes$).subscribe(
      (rewards: ICampaignOutcome[]) => {
        rewards.filter(data => data).map((outcome: ICampaignOutcome) => this.addOutcome(outcome));
        this.updateOutcomesInCampaign();
      }
    );
  }

  public addOutcome(value: ICampaignOutcome): void {
    this.outcomes.push(value);
    this.cd.detectChanges();
  }
  public updateOutcomesInCampaign(): void {
    const otherSlotOutcomes = this.campaign.outcomes && this.campaign.outcomes.length > 0 ?
      this.campaign.outcomes.filter(
        outcomeData => outcomeData.outcome.slotNumber !== this.slotNumber && outcomeData.outcome.slotNumber >= 0
      ) : [];
    this.campaign.outcomes = [...otherSlotOutcomes, ...this.outcomes];
    // bypasses null/undefined/0, will scan thru the campaign outcomes for final check
    // if set to true enableProbability then just true, (from checkbbox)
    this.campaign.enabledProb = this.enableProbability || this.campaign.outcomes.some(({outcome}) => outcome.probability);
    this.store.currentCampaign = {...this.campaign};
    this.isSpinEngagement ?
      (this.updateSlotCount().updateSumMoreThanCheck()) : (this.sumMoreThanError = this.updateSumMoreThanCheck());
  }

  public updateSlotCount(): this {
    const checkedOutcomes = this.outcomes.filter(outcome => outcome.outcome.slotNumber >= 0 && outcome.reward);
    if (checkedOutcomes.length === 0) {
      this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`).patchValue(0);
    }
    if (checkedOutcomes.length > 0) {
      this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`).patchValue(1);
    }
    this.formParent.updateValueAndValidity();
    return this;
  }
  // called for non spin campaigns
  public updateSumMoreThanCheck(): boolean {
    const totalNum = this.outcomes.reduce((total, item) => {
      if (item.outcome.probability) {
        total += item.outcome.probability;
      }
      return total;
    }, 0);
    const slotProbControl = this.formParent.get('totalProbAllSlots').get(`totalProbability-${this.slotNumber}`);
    if (slotProbControl) {
      slotProbControl.patchValue(totalNum);
    }
    this.formParent.updateValueAndValidity();
    return totalNum > 100;
  }

  public updateOutcomeData(index: number, value: { probability: number, limit: number }): void {
    this.outcomes[index].outcome.probability = value.probability;
    this.outcomes[index].outcome.limit = value.limit;
    this.updateOutcomesInCampaign();
  }

  public removeOutcome(index: number): void {
    if (index > -1) {
      this.outcomes[index].outcome.slotNumber = -1;
      this.outcomes[index].outcome.probability = 0;
    }
    this.updateOutcomesInCampaign();
  }

  public updateOutcomes(): void {
    if (!this.enableProbability) {
      if (this.outcomes.length) {
        this.outcomes[0].outcome.slotNumber = -1;
      }
    } else {
      this.outcomes[0].outcome.slotNumber = this.slotNumber;
    }
    this.updateOutcomesInCampaign();
    this.cd.detectChanges();
  }

}
