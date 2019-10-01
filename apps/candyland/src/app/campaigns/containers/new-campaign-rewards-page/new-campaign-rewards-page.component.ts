import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public isFirstInit: boolean = true;
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
    this.subscribeFormValueChange();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
  }

  private initForm(): void {
    this.form = this.fb.group({
      rewardsOptions: [],
      limits: this.fb.group({
        times: [null, [
          // Validators.required,
          Validators.min(1),
          Validators.max(60)
        ]],
        duration: [null, [
          // Validators.required
        ]],
        id: null
      })
    });
    this.store.currentCampaign$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        const isFirstTimeRenderFromAPIResponse = data && data.id && data.limits && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.form.patchValue(data);
        }
      });
    this.form.patchValue(this.defaultValue);
  }

  private subscribeFormValueChange(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        this.store.updateCampaign(val);
      });
  }
}
