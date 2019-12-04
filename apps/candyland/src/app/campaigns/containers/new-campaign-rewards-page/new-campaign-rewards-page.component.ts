import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { NewCampaignRewardsStampsFormService } from '../../services/new-campaign-rewards-stamps-form.service';

@Component({
  selector: 'cl-new-campaign-rewards-page',
  templateUrl: './new-campaign-rewards-page.component.html',
  styleUrls: ['./new-campaign-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  @Input() public campaignType: string;
  public group: FormGroup = this.formService.getLimitsForm(this.campaignType);

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
  }

  private subscribeFormValueChange(): void {
    this.group.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: ICampaign) => this.store.updateCampaign(val));
  }
}
