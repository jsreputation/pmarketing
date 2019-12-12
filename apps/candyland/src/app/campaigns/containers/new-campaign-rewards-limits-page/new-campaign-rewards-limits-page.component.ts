import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import {AbstractStepWithForm} from '../../step-page-with-form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StepConditionService} from '../../services/step-condition.service';
import {ClValidators} from '@cl-helpers/cl-validators';
import {Subject} from 'rxjs';

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
  public isSpinEngagement: boolean = false;
  public sumMoreThanError: boolean = false;
  public rewardNotAllPatchedError: boolean = true;
  public form1pt1: FormGroup;
  // Slot 0 for those outcomes not caterorized, -1 for those outcomes need to be deleted
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
    // just to get error out , console will nag you that formGroups needs to be inside html
    // html is put but if it is not initalised earlier it says that [formGroup] is not passed a FormGroup
    // will be overwritten on subscription where initForm() is called.
    this.form1pt1 = this.fb.group({
      ctrlX: [null]
    });
  }

  private initForm(): void {
    this.form1pt1 = this.fb.group({
      totalProbability: [null, [ClValidators.sumMoreThan]],
    });
    if (this.isSpinEngagement) {
      this.form1pt1.addControl('slotsNotEmpty', this.fb.control([0, this.slots.length], ClValidators.rewardSlotted));
    }
    this.stepConditionService.registerStepCondition(1.1, this.form1pt1);
    this.form1pt1.valueChanges.subscribe(
      (values) => {
        this.sumMoreThanError = values.totalProbability > 100;
        this.rewardNotAllPatchedError = values.slotsNotEmpty[0] !== values.slotsNotEmpty[1];
      }
    );
  }

  public ngOnInit(): void {
    this.store.currentCampaign$
      .asObservable()
      .subscribe((data: ICampaign) => {
        const hasTemplate = data && data.template;
        if (hasTemplate) {
          this.slots = this.store.currentCampaign.template.slots || [0];
          this.campaignEngagementType = data.template.attributes_type;
          this.isSpinEngagement = data.template.game_type === 'spin';
          this.initForm();
          if (!this.destroyed) {
            this.cd.detectChanges();
          }
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
