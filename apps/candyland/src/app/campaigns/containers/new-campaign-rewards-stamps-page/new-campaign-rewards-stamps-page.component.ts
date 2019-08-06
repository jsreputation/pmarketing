import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
// import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
// import { ClValidators } from '@cl-helpers/cl-validators';
// import { untilDestroyed } from 'ngx-take-until-destroy';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';

@Component({
  selector: 'cl-new-campaign-rewards-stamps-page',
  templateUrl: './new-campaign-rewards-stamps-page.component.html',
  styleUrls: ['./new-campaign-rewards-stamps-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsStampsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  // public form: FormGroup;
  // public rewardsList: Reward[] = [
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
  //
  // public rewardsTemplate: Reward = {
  //   id: 1,
  //   image: 'assets/images/mask-group.png',
  //   name: 'Free Coffee',
  //   type: 'Starbucks',
  //   current: 500,
  //   total: 1000
  // };

  // public get enableProbability(): AbstractControl {
  //   return this.form.get('enableProbability');
  // }

  // public get rewards(): FormArray {
  //   return this.form.get('rewards') as FormArray;
  // }

  // public get sumMoreThanError(): number {
  //   return this.rewards.getError('sumMoreThan');
  // }

  constructor(public store: CampaignCreationStoreService,
              public stepConditionService: StepConditionService,
              public cd: ChangeDetectorRef,
              // private fb: FormBuilder
  ) {
    super(1, store, stepConditionService, cd);
    // this.initForm();
  }

  public ngOnInit() {
    super.ngOnInit();
    // this.updateRewards();
    // this.enableProbability.valueChanges
    //   .pipe(untilDestroyed(this))
    //   .subscribe(() => this.updateRewards());
  }

  ngOnDestroy(): void {
  }

  // public addReward(value: any = this.rewardsTemplate): void {
  //   this.rewardsList.push(value);
  //   this.rewards.push(this.createRewardForm(value));
  // }
  //
  // public removeReward(index: number): void {
  //   this.rewards.removeAt(index);
  // }

  // private initForm(): void {
  //   this.form = this.fb.group({
  //     enableProbability: ([false]),
  //     rewards: this.fb.array([],
  //       [ClValidators.sumMoreThan({fieldName: 'probability'})]
  //     ),
  //     limits: this.fb.group({
  //       times: [null, [
  //         Validators.required,
  //         Validators.min(1),
  //         Validators.max(60)
  //       ]],
  //       duration: [null, [
  //         Validators.required
  //       ]]
  //     })
  //   });
  //   this.form.patchValue(this.store.currentCampaign);
  // }
  //
  // private createRewardForm(value): FormGroup {
  //   if (this.enableProbability.value) {
  //     return this.fb.group({
  //       value: [value],
  //       probability: [0]
  //     });
  //   } else {
  //     return this.fb.group({
  //       value: [value]
  //     });
  //   }
  // }
  //
  // private updateRewards(): void {
  //   this.rewards.clear();
  //   if (this.enableProbability.value) {
  //     this.rewards.push(this.createRewardForm(null));
  //   }
  //   this.rewardsList.forEach(reward => {
  //     this.rewards.push(this.createRewardForm(reward));
  //   });
  // }
}
