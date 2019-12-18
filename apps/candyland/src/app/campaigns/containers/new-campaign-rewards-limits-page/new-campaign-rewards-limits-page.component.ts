import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import {AbstractStepWithForm} from '../../step-page-with-form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StepConditionService} from '../../services/step-condition.service';
import {ClValidators} from '@cl-helpers/cl-validators';
import {Subject} from 'rxjs';
import { ICampaign } from '@cl-core/models/campaign/campaign';

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
  public sumMoreThanError: boolean = false;
  public rewardNotAllPatchedError: boolean = true;
  public form1pt1: FormGroup;
  // Slot 0 for those outcomes not caterorized, -1 for those outcomes need to be deleted
  public slots: number[] = [0];
  public firstInit: boolean = false;
  private destroyed: boolean = false;
  protected destroy$: Subject<void> = new Subject();

  constructor(
    public store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
    public stepConditionService: StepConditionService,
    private fb: FormBuilder
  ) {
    super(1.1, store, stepConditionService);
    this.form1pt1 = this.fb.group({});
  }

  private initForm(): void {
    this.slots.forEach((slotIndex) => {
      this.form1pt1.addControl(`totalProbability-${slotIndex}`, this.fb.control(0, ClValidators.sumMoreThan));
      if (this.isSpinEngagement) {
        this.form1pt1.addControl(`notEmpty-${slotIndex}`, this.fb.control(0, ClValidators.rewardSlotted));
      }
    });
    this.stepConditionService.registerStepCondition(1.1, this.form1pt1);
    this.firstInit = true;
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
          if (!this.firstInit || this.templateID !== data.template.id) {
            this.templateID = data.template.id;
            this.form1pt1 = this.fb.group({}); // resetting
            this.initForm();
          }
          if (!this.destroyed) {
            this.cd.detectChanges();
          }
        }
      });
    this.form1pt1.valueChanges.subscribe(
      (values) => {
        if (this.isSpinEngagement) {
          let totalNum = 0;
          let totalSlotted = 0;
          this.slots.forEach((slotIndex) => {
            totalNum += values[`totalProbability-${slotIndex}`];
            totalSlotted += values[`notEmpty-${slotIndex}`];
          });
          this.rewardNotAllPatchedError = totalSlotted !== this.slots.length;
          this.sumMoreThanError = totalNum > 100;
        }
      });
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroyed = true;
    this.destroy$.next();
    this.destroy$.complete();
  }

}
