import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NewCampaignRewardsStampsFormService } from 'src/app/campaigns/services/new-campaign-rewards-stamps-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { oc } from 'ts-optchain';
import { takeUntil } from 'rxjs/operators';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

@Component({
  selector: 'cl-new-campaign-rewards-limits-page',
  templateUrl: './new-campaign-rewards-limits-page.component.html',
  styleUrls: ['./new-campaign-rewards-limits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsLimitsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public form: FormGroup;
  private isFirstInit: boolean = true;
  public slots: number[];

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private formService: NewCampaignRewardsStampsFormService
  ) {
    super(1, store, stepConditionService);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    if (!this.form) {
      return;
    }
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICampaign) => {
        const isFirstTimeRenderFromAPIResponse = data && data.template && this.isFirstInit;
        if (isFirstTimeRenderFromAPIResponse) {
          this.isFirstInit = false;
          this.slots = this.store.currentCampaign.template.slots || [0];
        }
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }

  public get campaignEngagementType(): string {
    return oc(this.store.currentCampaign).template.attributes_type('game');
  }

  public get rewardsListCollection(): FormArray {
    console.log(this.form.get('rewardsListCollection'));
    return this.form.get('rewardsListCollection') as FormArray;
  }

  public get limits(): FormGroup {
    return this.form.get('limits') as FormGroup;
  }

  public addReward(formGroup: FormGroup): void {
    this.rewardsListCollection.push(formGroup);
  }

  public removeReward(index: number): void {
    this.rewardsListCollection.removeAt(index);
  }

  private initForm(): void {
    this.form = this.formService.getForm();
  }

  private createRewardForm(slotNumber: number): FormGroup {
    return new FormGroup({
      slotNumber: new FormControl(slotNumber),
      rewardsOptions: new FormControl([])
    });
  }

}
