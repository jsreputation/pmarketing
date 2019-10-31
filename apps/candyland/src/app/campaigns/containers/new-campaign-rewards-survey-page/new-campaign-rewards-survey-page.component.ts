import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

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
  public isFirstInit: boolean = true;
  public form: FormGroup;
  public defaultValue: {[key: string]: any} = {
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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super(1, store, stepConditionService);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }

  private initForm(): void {
    this.form = this.fb.group({
      rewardsOptions: [],
      limits: this.fb.group({
        times: [null, [
          Validators.min(1),
          Validators.max(60)
        ]],
        duration: [null, [
        ]],
        id: null
      })
    });
    if (this.route.snapshot.params.id) {
      this.store.currentCampaign$
        .asObservable()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          const isFirstTimeRenderFromAPIResponse = data && data.id && data.limits && data.limits.id && this.isFirstInit;
          if (isFirstTimeRenderFromAPIResponse) {
            this.isFirstInit = false;
            const limitsData = Object.assign({}, data);
            this.form.patchValue(limitsData);
          }
        });
    } else {
      this.form.patchValue(this.defaultValue);
    }
  }
}
