import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { StepConditionService } from '../../services/step-condition.service';

@Component({
  selector: 'cl-new-campaign-rewards-survey-page',
  templateUrl: './new-campaign-rewards-survey-page.component.html',
  styleUrls: ['./new-campaign-rewards-survey-page.component.scss']
})
export class NewCampaignRewardsSurveyPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;
  public defaultValue = {
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

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    super(1, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      rewardsOptions: [],
      limits: this.fb.group({
        times: [null, [
          Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]]
      })
    });
    this.form.patchValue(this.defaultValue);
  }
}
