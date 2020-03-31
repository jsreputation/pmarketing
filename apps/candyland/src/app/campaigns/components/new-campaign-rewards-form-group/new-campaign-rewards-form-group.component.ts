import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input, OnChanges, SimpleChanges, ViewChildren, QueryList
} from '@angular/core';
import {
  FormGroup, Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material';

import {
  combineLatest,
  of,
  Subject,
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
import { RewardItemComponent } from '../reward-item/reward-item.component';
import { ICampaign } from '@cl-core/models/campaign/campaign';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0; // slotNumber -1 interfaces with probNoRewards, see limit page for details
  @Input() public enableProbability: boolean = false;
  @ViewChildren(RewardItemComponent) public viewItemChildren !: QueryList<RewardItemComponent>;

  private destroy$: Subject<void> = new Subject();

  @Input() public formParent: FormGroup; // turn into an input
  @Input() public isSpinEngagement: boolean = false;

  public outcomes: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  public sumMoreThanError: boolean = false;
  public minSumError: boolean = false;

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

  public get campaign(): ICampaign {
    return this.store.currentCampaign;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.isFirstInit && this.outcomes.length !== 0 && changes.enableProbability !== undefined &&
      (changes.enableProbability.currentValue !== changes.enableProbability.previousValue)) {
      this.updateOutcomesInCampaign();
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
          this.updateOutcomesInCampaign();
          this.cd.detectChanges();
        }
      });
    this.handlerForToucheFormGroup();
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
              probability: null,
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
    if (!this.isSpinEngagement) {
      const noOutcomeData = this.campaign.outcomes && this.campaign.outcomes.find(
        data => data.outcome.slotNumber === this.slotNumber && !data.outcome.resultId);
      if (noOutcomeData && noOutcomeData.outcome) {
        this.outcomes = [noOutcomeData];
      } else {
        this.outcomes = [this.noOutcome];
      }
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
      this.rewardsService.getReward(`${data.outcome.resultId}`).pipe(
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
    if (!this.isSpinEngagement) {
      if (!this.enableProbability) { // false
        this.outcomes[0].outcome.slotNumber = -1;
      } else {
        this.outcomes[0].outcome.slotNumber = this.slotNumber;
      }
    }
    const otherSlotOutcomes = this.campaign.outcomes && this.campaign.outcomes.length > 0 ?
      this.campaign.outcomes.filter(
        outcomeData => outcomeData.outcome.slotNumber !== this.slotNumber && outcomeData.outcome.slotNumber >= 0
      ) : [];
    this.campaign.outcomes = [...otherSlotOutcomes, ...this.outcomes];
    // bypasses null/undefined/0, will scan thru the campaign outcomes for final check
    // if set to true enableProbability then just true, (from checkbox)
    this.campaign.enabledProb = this.enableProbability || this.campaign.outcomes.some(({ outcome }) => outcome.probability !== undefined);
    this.store.currentCampaign = { ...this.campaign };
    this.isSpinEngagement ? (this.updateSlotCount().updateSumMoreThanCheck()) : (this.sumMoreThanError = this.updateSumMoreThanCheck());
    this.formParent.updateValueAndValidity();
    this.cd.detectChanges();
  }

  public updateSlotCount(): this {
    const checkedOutcomes = this.outcomes.filter(outcome => outcome.outcome.slotNumber >= 0 && outcome.reward);
    if (checkedOutcomes.length === 0 && this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`)) {
      this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`).patchValue(0);
    }
    if (checkedOutcomes.length > 0 && this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`)) {
      this.formParent.get('totalFilledAllSlots').get(`notEmpty-${this.slotNumber}`).patchValue(1);
    }
    return this;
  }
  // called for non spin campaigns
  public updateSumMoreThanCheck(): boolean {
    const slotProbControl = this.formParent.get('totalProbAllSlots').get(`totalProbability-${this.slotNumber}`);
    if (!this.enableProbability && slotProbControl) {
      if (slotProbControl) {
        slotProbControl.reset();
        this.minSumError = false;
        slotProbControl.clearValidators();
      }
      return;
    }
    const totalNum = this.outcomes.reduce((total, item) => {
      if (item.outcome.probability) {
        total += item.outcome.probability;
      }
      return total;
    }, 0);
    if (slotProbControl) {
      if (this.slotNumber !== -1) {
        slotProbControl.setValidators(Validators.min(0));
      }
      slotProbControl.patchValue(totalNum);
      this.minSumError = totalNum <= 0;
    }
    return totalNum > 100;
  }

  public updateOutcomeData(index: number, value: { probability: number, limit: number }): void {
    if (this.outcomes) {
      this.outcomes[index].outcome.probability = value.probability;
      this.outcomes[index].outcome.limit = value.limit;
    }
    this.updateOutcomesInCampaign();
  }

  public removeOutcome(index: number): void {
    if (index > -1) {
      this.outcomes[index].outcome.slotNumber = -1;
      this.outcomes[index].outcome.probability = 0;
    }
    this.updateOutcomesInCampaign();
  }

  private handlerForToucheFormGroup(): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.formParent.get('totalProbAllSlots').touched) {
          this.viewItemChildren.forEach((component) => {
            component.group.get('limit').markAsTouched();
            component.group.get('probability').markAsTouched();
            component.runChangeDetection();
          });
        }

        // it is needed for the set or remove error unpatchedSlot
        // when we choose spin type of engagement
        // for the Outcomes step
        if (this.formParent.get('totalFilledAllSlots').touched
        &&  this.checkValueSlots((this.formParent.get('totalProbAllSlots') as FormGroup)) && this.isSpinEngagement) {
          this.formParent.get('totalFilledAllSlots').setErrors({unpatchedSlot: true});
          this.formParent.updateValueAndValidity();
          this.cd.markForCheck();
        }
        if (!this.isSpinEngagement) {
          this.formParent.get('totalFilledAllSlots').setErrors(null);
          this.formParent.updateValueAndValidity();
        }
      });
  }

  private checkValueSlots(group?: FormGroup): boolean {
    const controls = group.controls;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        return controls[key].value <= 0;
      }
    }
  }
}
