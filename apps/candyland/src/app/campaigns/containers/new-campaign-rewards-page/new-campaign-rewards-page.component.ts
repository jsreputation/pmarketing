import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';
import { noop } from 'rxjs';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCampaignRewardsPageComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  @Input() public campaignType: string;
  @Input() public group: FormGroup = this.formService.getLimitsForm(this.campaignType);

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  public isFirstInit: boolean = true;

  public get times(): FormControl {
    return this.group.get('times') as FormControl;
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

  private initForm(): void {
    if (!this.group) {
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
            this.group.patchValue(limitsData);
          }
        });
    } else {
      this.group.patchValue(this.formService.getDefaultValue(this.campaignType));
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
    this.group.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: ICampaign) => this.store.updateCampaign(val));
  }
}
