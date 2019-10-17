import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
  @Input() public tenantSettings: ITenantsProperties;
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
    if (!this.form) {
      return;
    }
    const stampsSlotNumber = this.store.currentCampaign.template.slots;
    const stampsNumber = +this.store.currentCampaign.template.nb_of_slots;
    for (const slotNumber of stampsSlotNumber) {
      this.addReward(this.createRewardForm(slotNumber));
    }
    this.form.get('stampsRule.sequence').valueChanges
      .pipe(takeUntil(this.destroy$))
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
    super.ngOnDestroy();
    this.cd.detach();
  }

  public get rewardsListCollection(): FormArray {
    return this.form.get('rewardsListCollection') as FormArray;
  }

  public get stampRule(): FormArray {
    return this.form.get('stampsRule.rules') as FormArray;
  }

  public get isSequence(): boolean {
    return this.form.get('stampsRule.sequence').value;
  }

  public addReward(formGroup: FormGroup): void {
    this.rewardsListCollection.push(formGroup);
  }

  public removeReward(index: number): void {
    this.rewardsListCollection.removeAt(index);
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
    if (!this.form) {
      return;
    }
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
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
