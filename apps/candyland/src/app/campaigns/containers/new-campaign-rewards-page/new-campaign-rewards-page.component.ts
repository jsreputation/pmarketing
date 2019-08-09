import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  defaultValue = {
    rewardsOptions: {
      enableProbability: true,
      rewards: [
        {
          value: null,
          probability: 5
        },
        {
          value: {
            id: 1,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee',
            type: 'Starbucks',
            current: 500,
            total: 1000
          },
          probability: 20
        },
        {
          value: {
            id: 2,
            image: 'assets/images/mask-group.png',
            name: 'Free Coffee 2',
            type: 'Starbucks',
            current: 500,
            total: 800
          },
          probability: 43
        }
      ]
    }
  };

  constructor(public store: CampaignCreationStoreService,
              public stepConditionService: StepConditionService,
              public cd: ChangeDetectorRef,
              private fb: FormBuilder) {
    super(1, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      rewardsOptions: [],
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
    this.form.patchValue(this.defaultValue);
  }
}
