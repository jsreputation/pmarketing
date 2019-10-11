import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ClValidators } from '@cl-helpers/cl-validators';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { noop, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RewardsService } from '@cl-core/services/rewards.service';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCampaignRewardsFormGroupComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public title: string = 'Rewards';
  @Input() public group: FormGroup = this.fb.group({
    enableProbability: [false],
    rewards: this.fb.array([], [ClValidators.sumMoreThan({ fieldName: 'probability' })]
    )
  });
  @Input() public slotNumber: number;

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  private isFirstInit: boolean;
  private noOutCome: { probability: 0, outcomeId: '' };

  public get enableProbability(): AbstractControl {
    return this.group.get('enableProbability');
  }

  public get rewards(): FormArray {
    return this.group.get('rewards') as FormArray;
  }

  public get sumMoreThanError(): number {
    return this.rewards.getError('sumMoreThan');
  }

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: CampaignCreationStoreService,
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
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.rewardsList && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.initRewardsList();
        }
      });
    this.enableProbability.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged()
      )
      .subscribe((value: boolean) => {
        this.updateRewards(value);
      });
    this.group.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((reward) => {
        this.onChange(reward);
      });
  }

  public ngOnDestroy(): void {
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
    this.rewards.reset();
    const noOutcome = this.campaign.rewardsList.find(outcome => !outcome.resultId);
    this.noOutCome = {
      probability: noOutcome && noOutcome.probability || 0,
      outcomeId: noOutcome.id
    };

    const possibleOutcomes = this.campaign.rewardsList.filter(data => {
      if (!this.slotNumber) {
        return true;
      }
      return data.lootBoxId === this.slotNumber;
    }).filter(data => data.resultId)
      .map(data => this.rewardsService.getReward(data.resultId).pipe(
        map(reward => ({ ...reward, probability: data.probability, outcomeId: data.id }))
      ));
    combineLatest(...possibleOutcomes).subscribe(
      (rewards: Partial<IRewardEntity>[]) => {
        if (rewards[0].probability) {
          this.enableProbability.patchValue(true);
        }
        rewards.map((reward: IRewardEntity) => this.addReward(reward));
      }

    );
  }

  public addReward(value: IRewardEntity): void {
    this.rewards.push(this.createRewardFormGroup(value, this.enableProbability.value));
    this.cd.detectChanges();
  }

  public removeReward(index: number): void {
    this.rewards.removeAt(index);
  }

  public writeValue(data: any): void {
    if (data === null) {
      return;
    }

    this.group.patchValue(data, { emitEvent: false });
    this.group.updateValueAndValidity();
    this.cd.detectChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.group.markAsTouched();
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }

  private createRewardFormGroup(value: IRewardEntity, isEnableProbability: boolean = false): FormGroup {
    return this.fb.group({
      value: value && [value] || [{ outcomeId: this.noOutCome && this.noOutCome.outcomeId }],
      probability: {
        value: value ? value.probability || 0 : this.noOutCome && this.noOutCome.probability || 0, disabled: !isEnableProbability
      }
    });
  }

  private updateRewards(isEnableProbability: boolean): void {
    if (isEnableProbability) {
      this.rewards.insert(0, this.createRewardFormGroup(null, isEnableProbability));
      for (let i = 0; i < this.rewards.length; i++) {
        this.rewards.at(i).get('probability').enable({ emitEvent: false });
      }
    } else {
      this.rewards.removeAt(0);
      for (let i = 0; i < this.rewards.length; i++) {
        this.rewards.at(i).get('probability').reset(0, { emitEvent: false });
        this.rewards.at(i).get('probability').disable({ emitEvent: false });
      }
    }
    this.cd.detectChanges();
  }

}
