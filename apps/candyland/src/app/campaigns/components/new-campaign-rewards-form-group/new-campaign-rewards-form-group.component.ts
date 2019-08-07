import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  templateUrl: './new-campaign-rewards-form-group.component.html',
  styleUrls: ['./new-campaign-rewards-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsFormGroupComponent implements OnInit, OnDestroy {
  @Input() public title: string = 'Rewards';
  @Input() public formGroup: FormGroup = this.fb.group({
    enableProbability: ([false]),
    rewards: this.fb.array([],
      [ClValidators.sumMoreThan({fieldName: 'probability'})]
    )
  });
  @Input() public rewardsList: Reward[] = [
    {
      id: 1,
      image: 'assets/images/mask-group.png',
      name: 'Free Coffee',
      type: 'Starbucks',
      current: 500,
      total: 1000
    },
    {
      id: 2,
      image: 'assets/images/mask-group.png',
      name: 'Free Coffee 2',
      type: 'Starbucks',
      current: 500,
      total: 800
    }
  ];

  public rewardsTemplate: Reward = {
    id: 1,
    image: 'assets/images/mask-group.png',
    name: 'Free Coffee',
    type: 'Starbucks',
    current: 500,
    total: 1000
  };

  public get enableProbability(): AbstractControl {
    return this.formGroup.get('enableProbability');
  }

  public get rewards(): FormArray {
    return this.formGroup.get('rewards') as FormArray;
  }

  public get sumMoreThanError(): number {
    return this.rewards.getError('sumMoreThan');
  }

  constructor(public cd: ChangeDetectorRef,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.updateRewards();
    this.enableProbability.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updateRewards());
  }

  ngOnDestroy(): void {
  }

  public addReward(value: any = this.rewardsTemplate): void {
    this.rewardsList.push(value);
    this.rewards.push(this.createRewardForm(value));
  }

  public removeReward(index: number): void {
    this.rewards.removeAt(index);
  }

  private createRewardForm(value): FormGroup {
    if (this.enableProbability.value) {
      return this.fb.group({
        value: [value],
        probability: [0]
      });
    } else {
      return this.fb.group({
        value: [value]
      });
    }
  }

  private updateRewards(): void {
    this.rewards.clear();
    if (this.enableProbability.value) {
      this.rewards.push(this.createRewardForm(null));
    }
    this.rewardsList.forEach(reward => {
      this.rewards.push(this.createRewardForm(reward));
    });
  }
}
