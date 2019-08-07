import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  forwardRef
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
import { noop } from 'rxjs';

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
  @Input() public title = 'Rewards';
  @Input() public group: FormGroup = this.fb.group({
    enableProbability: ([false]),
    rewards: this.fb.array([],
      [ClValidators.sumMoreThan({fieldName: 'probability'})]
    )
  });
  // private rewardsList: Reward[] = [];
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  //   = [
  //   {
  //     id: 1,
  //     image: 'assets/images/mask-group.png',
  //     name: 'Free Coffee',
  //     type: 'Starbucks',
  //     current: 500,
  //     total: 1000
  //   },
  //   {
  //     id: 2,
  //     image: 'assets/images/mask-group.png',
  //     name: 'Free Coffee 2',
  //     type: 'Starbucks',
  //     current: 500,
  //     total: 800
  //   }
  // ];

  public rewardsTemplate: Reward = {
    id: 1,
    image: 'assets/images/mask-group.png',
    name: 'Free Coffee',
    type: 'Starbucks',
    current: 500,
    total: 1000
  };

  public get enableProbability(): AbstractControl {
    return this.group.get('enableProbability');
  }

  public get rewards(): FormArray {
    return this.group.get('rewards') as FormArray;
  }

  public get sumMoreThanError(): number {
    return this.rewards.getError('sumMoreThan');
  }

  constructor(public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.updateRewards();
    this.enableProbability.valueChanges.pipe(untilDestroyed(this))
      .subscribe(() => {
        this.updateRewards();
      });
    this.group.valueChanges.pipe(untilDestroyed(this))
      .subscribe((reward) => {
        this.onChange(reward);
      });
  }

  ngOnDestroy(): void {
  }

  public openDialogSelectReward(): void {
    const dialogRef = this.dialog.open(SelectRewardPopupComponent);

    dialogRef.afterClosed().subscribe((reward) => {
      console.log('reward', reward);
      if (reward) {
        this.addReward(reward);
      }
    });
  }

  public addReward(value: any = this.rewardsTemplate): void {
    // this.rewardsList.push(value);
    this.rewards.push(this.createRewardForm(value));
    this.cd.detectChanges();
  }

  public removeReward(index: number): void {
    // this.rewardsList.splice(index, 1);
    this.rewards.removeAt(index);
  }

  private createRewardForm(value): FormGroup {
    // if (this.enableProbability.value) {
      return this.fb.group({
        value: [value],
        probability: [0]
      });
    // } else {
    //   return this.fb.group({
    //     value: [value]
    //   });
    // }
  }

  private updateRewards(): void {
    // this.rewards.clear();
    if (this.enableProbability.value) {
      // this.rewards.push(this.createRewardForm(null));
      this.rewards.insert(0, this.createRewardForm(null));
      for (const key in this.rewards) {
        this.rewards.get(key).get('probability').enable();
      }
    } else {
      this.rewards.removeAt(0);
      for (const key in this.rewards) {
        this.rewards.get(key).get('probability').enable();
      }
    }
    // this.rewardsList.forEach(reward => {
    //   this.rewards.push(this.createRewardForm(reward));
    // });
    this.cd.detectChanges();
  }

  writeValue(rewards: any): void {
    console.log('writeValue', rewards);
    if (rewards && rewards.length > 0) {
      this.rewardsList = rewards;
    } else {
      this.rewardsList = [];
    }
    this.updateRewards();
    this.group.patchValue(rewards);
    this.onChange(rewards);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.group.markAsTouched();
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }


}
