import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from '@cl-core/services/campaigns-creation-store.service';
import { ClValidators } from '@cl-helpers/cl-validators';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent implements OnInit {
  public form: FormGroup;
  public rewardsList = [
    {
      id: 1,
      image: '/assets/images/mask-group.png',
      name: 'Free Coffee',
      type: 'Starbucks',
      current: 500,
      total: 1000,
    },
    {
      id: 2,
      image: '/assets/images/mask-group.png',
      name: 'Free Coffee 2',
      type: 'Starbucks',
      current: 500,
      total: 800,
    }
  ];

  public rewardsTemplate = {
    id: 1,
    image: '/assets/images/mask-group.png',
    name: 'Free Coffee',
    type: 'Starbucks',
    current: 500,
    total: 1000,
  };

  constructor(
    // private cd: ChangeDetectorRef,
    private store: CampaignCreationStoreService,
    private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    // this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
    this.updateRewards();
    this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
    // this.form.valueChanges.subscribe(value => console.log(value));
    this.enablePropability.valueChanges.subscribe(() => this.updateRewards());
  }

  private updateRewards() {
    this.rewards.clear();
    if (this.enablePropability.value) {
      this.rewards.push(this.createRewardForm(null));
    }
    this.rewardsList.forEach(reward => {
      this.rewards.push(this.createRewardForm(reward));
    });
  }

  private initForm() {
    this.form = this.fb.group({
      enablePropability: ([false]),
      rewards: this.fb.array([], [ClValidators.sumMoreThan({fieldName: 'propability'})]),
      limits: this.fb.group({
        times: [null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(60)
        ]],
        duration: [null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(60)
        ]]
      })
    });
    this.form.patchValue(this.store.currentCampaign);
  }

  get enablePropability() {
    return this.form.get('enablePropability');
  }

  get rewards(): FormArray {
    return this.form.get('rewards') as FormArray;
  }

  get sumMoreThanError(): number {
    return this.rewards.getError('sumMoreThan');
  }



  public createRewardForm(value): FormGroup {
    if (this.enablePropability.value) {
      return this.fb.group({
        value: [value],
        propability: [0]
      });
    }

    return this.fb.group({
      value: [value]
    });
  }

  public addReward(value: any = this.rewardsTemplate): void {
    this.rewardsList.push(value);
    this.rewards.push(this.createRewardForm(value));
  }

  public removeReward(index: number) {
    this.rewards.removeAt(index);
  }
}
