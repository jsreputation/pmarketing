import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import {AbstractStepWithForm} from '../../step-page-with-form';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {StepConditionService} from '../../services/step-condition.service';
import {ClValidators} from '@cl-helpers/cl-validators';
import {Subject} from 'rxjs';
import {ICampaign} from '@cl-core/models/campaign/campaign';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cl-new-campaign-rewards-limits-page',
  templateUrl: './new-campaign-rewards-limits-page.component.html',
  styleUrls: ['./new-campaign-rewards-limits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsLimitsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;

  public enableProbability: boolean = false;
  public addNoRewardGroup: boolean = false;
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
    this.limitRewardForm = this.generateBaseLimitForm();
  }

  public generateBaseLimitForm(): FormGroup {
    return this.fb.group({
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
    // if i generate new form here replace, buggy behavior with ctrls not working correctly
    // manually delete controls we re-add later just after
    // prevent phanthom ctrls, patch value errors
    this.limitRewardForm.removeControl('totalProbAllSlots'); // no show up, main for validation\n' +'
    this.limitRewardForm.removeControl('totalFilledAllSlots');
    this.limitRewardForm.addControl('totalProbAllSlots', this.fb.group({}));
    this.limitRewardForm.addControl('totalFilledAllSlots', this.fb.group({}));
    this.limitRewardForm.clearValidators();
    this.slots.forEach((slotIndex) => {
      this.probAllGroup.addControl(`totalProbability-${slotIndex}`,
        this.fb.control(null));
      if (this.isSpinEngagement) {
        this.fillAllGroup.addControl(`notEmpty-${slotIndex}`, this.fb.control(0));
      }
    });
    if (this.isSpinEngagement) {
      this.probAllGroup.setValidators(ClValidators.sumMoreThan());
      if (!this.addNoRewardGroup) {
        this.probAllGroup.setValidators([ClValidators.sumMoreThan(), ClValidators.minPercent(100)]);
      }
      this.fillAllGroup.setValidators(ClValidators.rewardPatched(this.slots.length)); // slot validator dynamically set
      if (this.addNoRewardGroup) {
        this.limitRewardForm.addControl(`totalProbability-${-1}`, new FormControl({value: null, disabled: true}));
        this.probAllGroup.valueChanges
          .pipe(
            map( (groupProbs: { [k: string]: number }) => Object.entries(groupProbs)
              .map(([, value]: [string, number]) => value)
              .reduce((p, c: number) => p + c || 0, 0)),
            map( (sumProb: number) => 100 - sumProb < 0 ? null : 100 - sumProb),
            takeUntil(this.destroy$)
          )
          .subscribe(value => {
            this.limitRewardForm.get(`totalProbability-${-1}`).patchValue(value);
          });
      }}
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
          if (this.isSpinEngagement) {
            this.addNoRewardGroup = data.template.slots.length !== data.template.nb_of_wedges;
          }
          if (!this.firstInit) {
            this.firstInit = true;
            this.initForm(); // resetting
          }
          if (this.templateID !== data.template.id) {
            this.templateID = data.template.id;
            this.patchedCheck = false;
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
