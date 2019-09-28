import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  SimpleChanges
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
import { distinctUntilChanged } from 'rxjs/operators';
import { RewardsService } from '@cl-core/services/rewards.service';

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
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
  @Input() public title = 'Rewards';
  @Input() public campaignDetail;
  @Input() public group: FormGroup = this.fb.group({
    enableProbability: [false],
    rewards: this.fb.array([], [ClValidators.sumMoreThan({ fieldName: 'probability' })]
    )
  });
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

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
    private rewardsService: RewardsService
  ) {
  }

  public ngOnInit(): void {
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.campaignDetail) {
      const currentCampaignDetail = changes.campaignDetail.currentValue;
      if (currentCampaignDetail && currentCampaignDetail.possible_outcomes) {
        this.initRewardsList();
      }
    }
  }

  public ngOnDestroy(): void {
  }

  public openDialogSelectReward(): void {
    const dialogRef = this.dialog.open(SelectRewardPopupComponent);

    dialogRef.afterClosed().subscribe((reward) => {
      if (reward) {
        this.addReward(reward);
      }
    });
  }
  public initRewardsList(): void {
    this.rewards.reset();
    const possibleOutcomes = this.campaignDetail.possible_outcomes.map(data => this.rewardsService.getReward(data.result_id));
    combineLatest(possibleOutcomes).subscribe(
      rewards => rewards.map((reward: IRewardEntity) => this.addReward(reward))
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
    const enableProbability = 'enableProbability' in data ? data.enableProbability : false;
    if ('rewards' in data && data.rewards) {
      for (let i = 0; i < data.rewards.length; i++) {
        this.rewards.insert(i, this.createRewardFormGroup(null, enableProbability));
      }
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
      value: [value],
      probability: { value: 0, disabled: !isEnableProbability }
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
