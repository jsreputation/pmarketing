import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input, OnChanges, SimpleChanges,
} from '@angular/core';
import {
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
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign.interface';
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
  private destroy$: Subject<void> = new Subject();

  @Input() public isSpinEngagement: boolean = false;
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  @Input() public formParent: FormGroup; // turn into an input
  @Input() public enableProbability: boolean = false;

  public outcomes: ICampaignOutcome[] = [];
  private isFirstInit: boolean;
  public patchedReward: boolean = false;
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
    private rewardsService: RewardsService,
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
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.template && data.template.id && data.outcomes && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.initOutcomesList();
          this.cd.detectChanges();
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.outcomes.length !== 0 && changes.enableProbility !== undefined &&
      (changes.enableProbability.currentValue !== changes.enableProbability.previousValue)) {
      this.updateOutcomeProbabilitySetting();
      this.updateOutcomesInCampaign();
      // this.updateOutcomes();
    }
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
            enableProbability: this.enableProbability,
            reward
          });
          if (this.isSpinEngagement) {
            this.passSlotCount();
          }
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

  public passSlotCount(slotRemove?: boolean): void {
    // include some console logs but comment out so easier to understand and debug later on
    // console.log(this.outcomes.length !== 0, 'set me as slotNotEmpty');
    // console.log('before anything this is the outcoems array', this.outcomes);
    const currentTotal = this.formParent.get('slotsNotEmpty').value[0];
    const actualTotal =  this.formParent.get('slotsNotEmpty').value[1];
    // this function is triggered after this.outcomes value is changed either from remove / add
    if (slotRemove && this.outcomes.length === 0) { // will be adjusted to > 1 when the no outcome thing works (andrew)
      // console.log('i am being called to remove from the current total');
      this.formParent.patchValue({
        slotsNotEmpty: [(currentTotal - 1), actualTotal]
      });
      this.patchedReward = false; // able to patch again when outcomes are empty
    }
    // Check alrdy been patched be4, idw to add again if alrdy been patched
    if (!slotRemove && this.outcomes.length !== 0 && !this.patchedReward) { // will be adjusted to if <= 1
      // console.log(' i am being called to add to the current total');
      this.formParent.patchValue({
        slotsNotEmpty: [(currentTotal + 1), actualTotal]
      });
      this.patchedReward = true;
    }
    this.formParent.updateValueAndValidity();
  }

  public isSumMoreThan(oldValue: number): void {
    const totalNum = this.outcomes.reduce((total, item) => {
      if (item.outcome.probability) {
        total += item.outcome.probability;
      }
      return total;
    }, 0) - oldValue;
    const currentTotal = this.formParent.get('totalProbability').value;
    this.formParent.patchValue({
      totalProbability:  (currentTotal + totalNum)
    });
    this.formParent.updateValueAndValidity();
    // return totalNum > 100;
  }

  public updateOutcomeData(index: number, value: { probability: number, limit: number, oldProbability: number }): void {
    this.outcomes[index].outcome.probability = value.probability;
    this.outcomes[index].outcome.limit = value.limit;
    this.updateOutcomesInCampaign();
    this.isSumMoreThan(value.oldProbability);
  }

  public removeOutcome(index: number): void {
    if (index > -1) {
      this.outcomes[index].outcome.slotNumber = -1;
    }
    this.outcomes.splice(index, 1);
    this.updateOutcomesInCampaign();
    if (this.isSpinEngagement) {
      this.passSlotCount(true);
    }
  }

  public updateOutcomes(): void {
    // if (this.enableProbability) {
    //   this.outcomes[0].outcome.slotNumber = this.slotNumber; // maybe forEach
    // } else {
    //   this.outcomes[0].outcome.slotNumber = -1;
    // }
    this.updateOutcomeProbabilitySetting();
    this.updateOutcomesInCampaign();
    this.cd.detectChanges();
  }

  private updateOutcomeProbabilitySetting(): void {
    this.outcomes.forEach(outcomeData => outcomeData.enableProbability = this.enableProbability);
  }
}
