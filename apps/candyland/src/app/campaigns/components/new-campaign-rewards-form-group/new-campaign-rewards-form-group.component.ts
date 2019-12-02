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
import { noop, combineLatest, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, catchError, takeUntil } from 'rxjs/operators';
import { RewardsService } from '@cl-core/services/rewards.service';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

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
  @Input() public title: string = 'CAMPAIGN.REWARDS';
  @Input() public slotNumber: number = 0;
  @Input() public group: FormArray = this.fb.array([
    this.fb.group({
      slotInfo: this.fb.group({
        enableProbability: [false],
        slotNumber: this.slotNumber
      }),
      rewardsOptions: {}
    })
  ], [ClValidators.sumMoreThan({ fieldName: 'rewardsOptions.probability' })]);

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  private isFirstInit: boolean;
  private noOutCome: { probability: 0, outcomeId: '' };
  private destroy$: Subject<void> = new Subject();

  public get enableProbability(): AbstractControl {
    return this.group.at(0).get('slotInfo.enableProbability');
  }

  public get rewards(): FormArray {
    return this.group.at(0).get('rewardsOptions') as FormArray;
  }

  public get sumMoreThanError(): number {
    return this.group.getError('sumMoreThan');
  }

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder,
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
    this.enableProbability.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value: boolean) => {
        this.updateRewards(value);
      });
    this.group.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((reward) => {
        this.onChange(reward);
        this.store.updateCampaign(reward);
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
    this.group.reset();
    const noOutcome = this.campaign.rewardsListCollection.find(outcomeData => !outcomeData.outcome.resultId);
    this.noOutCome = {
      probability: noOutcome && noOutcome.outcome && noOutcome.outcome.probability || 0,
      outcomeId: noOutcome && noOutcome.outcome && noOutcome.outcome.id
    };

    const possibleOutcomes = this.campaign.rewardsListCollection.filter(data => {
      console.log(this.slotNumber);
      if (!this.slotNumber) {
        return true;
      }
      return data.outcome.lootBoxId === this.slotNumber;
    }).filter(data => data.outcome.resultId)
      .map(data =>
        this.rewardsService.getReward(data.outcome.resultId).pipe(
          map((reward: IRewardEntity) =>
            ({ ...reward, probability: data.outcome.probability, outcomeId: data.outcome.id, limit: data.outcome.limit })),
          catchError(() => of(null))
        ));
    combineLatest(...possibleOutcomes).subscribe(
      (rewards: Partial<IRewardEntity>[]) => {
        rewards.filter(data => data).map((reward: IRewardEntity) => this.updateReward(reward));
        console.log('going to update rewards in campaign');
        this.updateRewardsInCampaign(this.group.value);
      }
    );
  }

  public addReward(value: IRewardEntity): void {
    this.group.push(this.createRewardFormGroup(value, this.enableProbability.value));
    console.log(this.group.value);
    this.cd.detectChanges();
  }

  public updateReward(value: IRewardEntity): void {
    if ((value.probability || value.probability === 0) && !this.enableProbability.value) {
      this.enableProbability.patchValue(true);
    }
    const newReward = this.createRewardFormGroup(value, this.enableProbability.value);
    this.group.push(newReward);
    this.cd.detectChanges();
  }

  public updateRewardsInCampaign(rewards: IRewardEntity[]): void {
    console.log(rewards);
  }

  public removeReward(index: number): void {
    this.group.removeAt(index);
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
      slotInfo: {
        enableProbability: isEnableProbability,
        slotNumber: this.slotNumber
      },
      rewardsOptions: value || { ...this.noOutCome }
    });
  }

  private updateRewards(isEnableProbability: boolean): void {
    if (isEnableProbability) {
      this.group.insert(0, this.createRewardFormGroup(null, isEnableProbability));
      for (let i = 0; i < this.group.length; i++) {
        this.group.at(i).get('rewardsOptions.probability').enable({ emitEvent: false });
      }
    } else {
      this.group.removeAt(0);
      for (let i = 0; i < this.group.length; i++) {
        this.group.at(i).get('rewardsOptions.probability').disable({ emitEvent: false });
      }
    }
    this.cd.detectChanges();
  }
}
