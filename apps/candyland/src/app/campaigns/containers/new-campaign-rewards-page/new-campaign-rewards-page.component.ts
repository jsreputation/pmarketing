import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { oc } from 'ts-optchain';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';
import { noop } from 'rxjs';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  @Input() public group: FormGroup = this.formService.getLimitsForm(this.campaignEngagementType);

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  public isFirstInit: boolean = true;
  public form: FormGroup;

  public get times(): FormControl {
    return this.form.get('limits.times') as FormControl;
  }

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private formService: NewCampaignRewardsStampsFormService,
    private route: ActivatedRoute
  ) {
    super(1, store, stepConditionService);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.subscribeFormValueChange();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }

  public get campaignEngagementType(): string {
    return oc(this.store.currentCampaign).template.attributes_type('game');
  }

  private initForm(): void {
    if (!this.form) {
      return;
    }
    if (this.route.snapshot.params.id) {
      this.store.currentCampaign$
        .asObservable()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ICampaign) => {
          const isFirstTimeRenderFromAPIResponse = data && data.id && data.limits && data.limits.id && this.isFirstInit;
          if (isFirstTimeRenderFromAPIResponse) {
            this.isFirstInit = false;
            const limitsData = Object.assign({}, data);
            this.form.patchValue(limitsData);
          }
        });
    } else {
      this.form.patchValue(this.formService.getDefaultValue(this.campaignEngagementType));
    }
    this.group.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (limit) => {
          this.onChange(limit);
        }
      );
  }

  public writeValue(data: any): void {
    if (data === null) {
      return;
    }

    this.group.patchValue(data, { emitEvent: false });
    this.group.updateValueAndValidity();
    this.cd.detectChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.group.markAsTouched();
  }

  private subscribeFormValueChange(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: ICampaign) => this.store.updateCampaign(val));
  }
}
