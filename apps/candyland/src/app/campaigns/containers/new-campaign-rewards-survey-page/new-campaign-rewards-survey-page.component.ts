import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { StepConditionService } from '../../services/step-condition.service';

@Component({
  selector: 'cl-new-campaign-rewards-survey-page',
  templateUrl: './new-campaign-rewards-survey-page.component.html',
  styleUrls: ['./new-campaign-rewards-survey-page.component.scss']
})
export class NewCampaignRewardsSurveyPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  @Input() public campaignDetail;

  public form: FormGroup;
  public defaultValue = {
    rewardsOptions: {
      enableProbability: false,
      rewards: []
    }
  };

  public get times(): FormControl {
    return this.form.get('limits.times') as FormControl;
  }

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
          // Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]]
      })
    });
    this.form.patchValue(this.defaultValue);
  }
}
