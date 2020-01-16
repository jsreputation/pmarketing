import {Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import {AbstractStepWithForm} from '../../step-page-with-form';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StepConditionService} from '../../services/step-condition.service';
import {ClValidators} from '@cl-helpers/cl-validators';
import {merge, Subject} from 'rxjs';
import {ICampaign} from '@cl-core/models/campaign/campaign';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {NewCampaignRewardsFormGroupComponent} from '../../components/new-campaign-rewards-form-group/new-campaign-rewards-form-group.component';

@Component({
  selector: 'cl-new-campaign-rewards-limits-page',
  templateUrl: './new-campaign-rewards-limits-page.component.html',
  styleUrls: ['./new-campaign-rewards-limits-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsLimitsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  @ViewChildren(NewCampaignRewardsFormGroupComponent) public viewFormChildren !: QueryList<NewCampaignRewardsFormGroupComponent>;

  public enableProbability: boolean = false;
  public addNoRewardGroup: boolean = false;
  public campaignEngagementType: string;
  public templateID: string;
  public isSpinEngagement: boolean = false;
  public limitRewardForm: FormGroup;
  public templateChangedNotif$: Subject<number> = new Subject();
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
    this.stepConditionService.registerStepCondition(1.1, this.limitRewardForm);
  }

  public generateBaseLimitForm(): FormGroup {
    return this.fb.group({
      enableProbability: [false],
      probNoRewards: this.fb.control({value: null, disabled: true}),
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

  private wipeControls(formGroup: FormGroup): FormGroup {
    Object.keys(formGroup.controls).forEach((controlKey) => {
      formGroup.removeControl(controlKey);
    });
    return formGroup;
  }

  private initForm(): void {
    this.limitRewardForm.clearValidators();
    this.wipeControls(this.probAllGroup);
    this.wipeControls(this.fillAllGroup);
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
    }
    this.updateLimitRewardForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICampaign) => {
        if (data && data.template && (this.templateID !== data.template.id || !this.templateID)) {
          this.templateID = data.template.id;
          this.templateChangedNotif$.next(+this.templateID);
          this.slots = data.template.slots || [0];
          this.campaignEngagementType = data.template.attributes_type;
          this.isSpinEngagement = data.template.game_type === 'spin';
          if (this.isSpinEngagement) {
            this.addNoRewardGroup = data.template.slots.length !== data.template.nb_of_wedges;
          }
          this.enableProbability = data.enabledProb;
          this.initForm();
          if (data.enabledProb) {
            this.limitRewardForm.get('enableProbability').patchValue(data.enabledProb);
          }
        }
      });

    this.limitRewardForm.get('enableProbability').valueChanges
      .subscribe(
        (probBoolean) => {
          this.enableProbability = probBoolean;
        }
      );

    merge(
      this.templateChangedNotif$,
      this.probAllGroup.valueChanges
    ).pipe(
      tap(value => {
        if (typeof value === 'number') {
          //  template changed, go inside item's group controls and reset everything
          this.viewFormChildren.forEach((form) => {
            form.viewItemChildren.forEach((item => {
              item.group.reset();
            }));
          });
        }
      }),
      // only group probs control passes through here, we patch the formControl
      filter(value => typeof value !== 'number'),
      map((groupProbs: { [k: string]: number }) => {
        if (this.enableProbability && this.addNoRewardGroup) {
          return Object.entries(groupProbs)
            .map(([, value]: [string, number]) => value)
            .reduce((p, c: number) => p + c || 0, 0);
        }
        return 0;
      }),
      map( (sumProb: number) => 100 - sumProb < 0 ? null : 100 - sumProb),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      if (value && this.limitRewardForm.get(`probNoRewards`)) {
        this.limitRewardForm.get(`probNoRewards`).patchValue(value);
        this.updateLimitRewardForm();
      }
    });
  }

  private updateLimitRewardForm(): void {
    this.limitRewardForm.updateValueAndValidity();
    if (!this.destroyed) {
      this.cd.detectChanges();
    }
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroyed = true;
    this.destroy$.next();
    this.destroy$.complete();
  }

}
