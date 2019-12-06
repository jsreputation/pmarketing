import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material';

import {
  combineLatest,
  of,
} from 'rxjs';
import {
  map,
  catchError,
  takeUntil,
} from 'rxjs/operators';

import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';
import { RewardsService } from '@cl-core/services/rewards.service';
import { ClValidators } from '@cl-helpers/cl-validators';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { StepConditionService } from '../../services/step-condition.service';
import { SOURCE_TYPE } from '../../../app.constants';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  public form: FormGroup;
  public outcomes: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  public enableProbability: boolean = false;
  public sumMoreThanError: boolean = false;
  public noOutcome: ICampaignOutcome = {
    outcome: {
      limit: null,
      probability: 0,
      slotNumber: -1
    },
    enableProbability: false
  };

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    private rewardsService: RewardsService,
    private fb: FormBuilder
  ) {
    super(1.1, store, stepConditionService);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      totalProbability: [null, [ClValidators.sumMoreThan()]]
    });
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
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.template && data.template.id && data.outcomes && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.initOutcomesList();
        }
      });
    if (this.form) {
      this.stepConditionService.registerStepCondition(1.1, this.form);
    }
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
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
            enableProbability: this.enableProbability,
            reward
          });
          this.updateOutcomesInCampaign();
        }
      });
  }

  public initOutcomesList(): void {
    const noOutcomeData = this.campaign.outcomes.find(data => data.outcome.slotNumber === this.slotNumber && !data.outcome.resultId);
    if (noOutcomeData && noOutcomeData.outcome) {
      noOutcomeData.enableProbability = true;
      this.outcomes = [noOutcomeData];
      this.enableProbability = true;
    } else {
      this.outcomes = [
        this.noOutcome
      ];
      this.enableProbability = false;
    }
    const possibleOutcomes = this.campaign.outcomes.filter(
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
    const possibleOutcomes$ = possibleOutcomes.map(data =>
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
    value.enableProbability = this.enableProbability;
    this.outcomes.push(value);
    if (value.outcome.probability > 0 && !this.enableProbability) {
      this.enableProbability = true;
      this.updateOutcomeProbabilitySetting();
    }
    this.cd.detectChanges();
  }

  public updateOutcomesInCampaign(): void {
    const otherSlotOutcomes = this.campaign.outcomes && this.campaign.outcomes.length > 0 ?
      this.campaign.outcomes.filter(
        outcomeData => outcomeData.outcome.slotNumber !== this.slotNumber && outcomeData.outcome.slotNumber >= 0
      ) : [];
    this.campaign.outcomes = [...otherSlotOutcomes, ...this.outcomes];
  }

  public isSumMoreThan(): boolean {
    const totalNum = this.outcomes.reduce((total, item) => {
      if (item.outcome.probability) {
        total += item.outcome.probability;
      }
      return total;
    }, 0);
    this.form.patchValue({
      totalProbability: totalNum
    });
    this.form.updateValueAndValidity();
    return totalNum > 100;
  }

  public updateOutcomeData(index: number, value: { probability: number, limit: number }): void {
    this.outcomes[index].outcome.probability = value.probability;
    this.outcomes[index].outcome.limit = value.limit;
    this.updateOutcomesInCampaign();
    this.sumMoreThanError = this.isSumMoreThan();
  }

  public removeOutcome(index: number): void {
    if (index > -1) {
      this.outcomes[index].outcome.slotNumber = -1;
    }
    this.updateOutcomesInCampaign();
  }

  public updateOutcomes(): void {
    if (this.enableProbability) {
      this.outcomes[0].outcome.slotNumber = this.slotNumber;
    } else {
      this.outcomes[0].outcome.slotNumber = -1;
    }
    this.updateOutcomeProbabilitySetting();
    this.updateOutcomesInCampaign();
    this.cd.detectChanges();
  }

  private updateOutcomeProbabilitySetting(): void {
    this.outcomes.forEach(outcomeData => outcomeData.enableProbability = this.enableProbability);
  }
}
