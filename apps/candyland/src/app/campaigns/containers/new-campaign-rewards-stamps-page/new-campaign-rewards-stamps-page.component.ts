import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NewCampaignRewardsStampsFormService } from 'src/app/campaigns/services/new-campaign-rewards-stamps-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';

@Component({
  selector: 'cl-new-campaign-rewards-stamps-page',
  templateUrl: './new-campaign-rewards-stamps-page.component.html',
  styleUrls: ['./new-campaign-rewards-stamps-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsStampsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  public form: FormGroup;

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private toggleControlService: ToggleControlService,
    private formService: NewCampaignRewardsStampsFormService) {
    super(1, store, stepConditionService, cd);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    const stampsSlotNumber = this.store.currentCampaign.template.slots;
    const stampsNumber = +this.store.currentCampaign.template.nb_of_slots;
    for (const slotNumber of stampsSlotNumber) {
      this.addReward(this.createRewardForm(slotNumber));
    }
    this.form.get('stampsRule.sequence').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        if (value) {
          this.initSequenceRules(stampsNumber);
        } else {
          this.initUnsequenceRules();
        }
      });
    // TODO: will be need for realization edit page
    // this.form.patchValue(this.formService.getDefaultValue());
  }

  public ngOnDestroy(): void {
  }

  public get rewardsList(): FormArray {
    return this.form.get('rewardsList') as FormArray;
  }

  public get stampRule(): FormArray {
    return this.form.get('stampsRule.rules') as FormArray;
  }

  public get isSequence(): boolean {
    return this.form.get('stampsRule.sequence').value;
  }

  public addReward(formGroup: FormGroup): void {
    this.rewardsList.push(formGroup);
  }

  public removeReward(index: number): void {
    this.rewardsList.removeAt(index);
  }

  public addStampRule(): void {
    if (this.stampRule.length <= 20) {
      this.stampRule.push(new FormControl(null));
    }
  }

  public removeStampRule(index: number): void {
    this.stampRule.removeAt(index);
  }

  private initForm(): void {
    this.form = this.formService.getForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(() => {
        const toggleConfig = this.formService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private createRewardForm(slotNumber: number): FormGroup {
    return new FormGroup({
      stampSlotNumber: new FormControl(slotNumber),
      rewardsOptions: new FormControl([])
    });
  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  private initUnsequenceRules(): void {
    this.clearFormArray(this.stampRule);
    this.addStampRule();
  }

  private initSequenceRules(stampsNumber: number): void {
    this.clearFormArray(this.stampRule);
    for (let i = 0; i < stampsNumber; i++) {
      this.addStampRule();
    }
  }

}
