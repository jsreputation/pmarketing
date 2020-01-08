import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import {AbstractStepWithForm} from '../../step-page-with-form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StepConditionService} from '../../services/step-condition.service';
import {ClValidators} from '@cl-helpers/cl-validators';
import {Subject} from 'rxjs';
import {ICampaign} from '@cl-core/models/campaign/campaign';

@Component({
  selector: 'cl-new-campaign-rewards-limits-page',
  templateUrl: './new-campaign-rewards-limits-page.component.html',
  styleUrls: ['./new-campaign-rewards-limits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsLimitsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public enableProbability: boolean = false;
  public campaignEngagementType: string;
  public templateID: string;
  public isSpinEngagement: boolean = false;
  public firstInit: boolean = false;
  public patchedCheck: boolean = false;
  public limitRewardForm: FormGroup;
  // Slot 0 for those outcomes not categorized, -1 for those outcomes need to be deleted
  public slots: number[] = [0];
  private destroyed: boolean = false;
  protected destroy$: Subject<void> = new Subject();

  constructor(
    public store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
    public stepConditionService: StepConditionService,
    private fb: FormBuilder
  ) {
    super(1.1, store, stepConditionService);
    this.limitRewardForm = this.fb.group({
      enableProbability: [false],
      totalProbAllSlots: this.fb.group( {}), // no show up, main for validation
      totalFilledAllSlots: this.fb.group({}) // doesn't show up in the template
    });
  }

  public get probAllGroup(): FormGroup {
    return this.limitRewardForm.get('totalProbAllSlots') as FormGroup;
  }

  public get fillAllGroup(): FormGroup {
    return this.limitRewardForm.get('totalFilledAllSlots') as FormGroup;
  }

  private initForm(): void {
    this.limitRewardForm.clearValidators();
    this.slots.forEach((slotIndex) => {
      this.probAllGroup.addControl(`totalProbability-${slotIndex}`, this.fb.control(0));
      if (this.isSpinEngagement) {
        this.fillAllGroup.addControl(`notEmpty-${slotIndex}`, this.fb.control(0));
      }
    });
    if (this.isSpinEngagement) {
      this.probAllGroup.setValidators(ClValidators.sumMoreThan());
      this.fillAllGroup.setValidators(ClValidators.rewardPatched(this.slots.length)); // slot validator dynamically set
    }
    this.limitRewardForm.updateValueAndValidity();
    this.stepConditionService.registerStepCondition(1.1, this.limitRewardForm);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.store.currentCampaign$
      .asObservable()
      .subscribe((data: ICampaign) => {
        const hasTemplate = data && data.template;
        if (hasTemplate) {
          this.slots = this.store.currentCampaign.template.slots || [0];
          this.campaignEngagementType = data.template.attributes_type;
          this.isSpinEngagement = data.template.game_type === 'spin';
          if (!this.firstInit) {
            this.firstInit = true;
            this.initForm(); // resetting
          }
          if (this.templateID !== data.template.id) {
            this.templateID = data.template.id;
            this.initForm();
          }
          if (this.store.currentCampaign.enabledProb && !this.patchedCheck) {
            this.patchedCheck = true;
            this.limitRewardForm.get('enableProbability').patchValue(this.store.currentCampaign.enabledProb);
          }
          this.limitRewardForm.updateValueAndValidity();
          if (!this.destroyed) {
            this.cd.detectChanges();
          }
        }
      });
    this.limitRewardForm.get('enableProbability').valueChanges
      .subscribe(
        (probBoolean) => {
          this.enableProbability = probBoolean;
        }
      );
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroyed = true;
    this.destroy$.next();
    this.destroy$.complete();
  }

}
