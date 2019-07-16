import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CampaignCreationStoreService} from '@cl-core/services/campaigns-creation-store.service';
import {ClValidators} from '@cl-helpers/cl-validators';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent implements OnInit {
  public form: FormGroup;
  public config;
  public rewardsList: Reward[] = [
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

  public rewardsTemplate: Reward = {
    id: 1,
    image: '/assets/images/mask-group.png',
    name: 'Free Coffee',
    type: 'Starbucks',
    current: 500,
    total: 1000,
  };

  public get enableProbability(): AbstractControl {
    return this.form.get('enableProbability');
  }

  public get rewards(): FormArray {
    return this.form.get('rewards') as FormArray;
  }

  public get sumMoreThanError(): number {
    return this.rewards.getError('sumMoreThan');
  }

  constructor(private store: CampaignCreationStoreService,
              private fb: FormBuilder) {
    this.initForm();
  }

  public ngOnInit() {
    this.config = this.store.config;
    this.updateRewards();
    this.form.valueChanges.subscribe(value => this.store.updateCampaign(value));
    this.enableProbability.valueChanges.subscribe(() => this.updateRewards());
  }


  public addReward(value: any = this.rewardsTemplate): void {
    this.rewardsList.push(value);
    this.rewards.push(this.createRewardForm(value));
  }

  public removeReward(index: number): void {
    this.rewards.removeAt(index);
  }

  private initForm(): void {
    this.form = this.fb.group({
      enableProbability: ([false]),
      rewards: this.fb.array([],
        [ClValidators.sumMoreThan({fieldName: 'probability'})]
      ),
      limits: this.fb.group({
        times: [null, [
          Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]],
        duration: [null, [
          Validators.required
        ]]
      })
    });
    this.form.patchValue(this.store.currentCampaign);
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
}
