import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { NewCampaignRewardsStampsFormService } from 'src/app/campaigns/services/new-campaign-rewards-stamps-form.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import { AbstractStepWithForm } from 'src/app/campaigns/step-page-with-form';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { oc } from 'ts-optchain';

@Component({
  selector: 'cl-new-campaign-rewards-stamps-page',
  templateUrl: './new-campaign-rewards-stamps-page.component.html',
  styleUrls: ['./new-campaign-rewards-stamps-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignRewardsStampsPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public form: FormGroup = this.formService.getLimitsForm('stamps');
  public isFirstInit: boolean = true;

  constructor(
    public store: CampaignCreationStoreService,
    public stepConditionService: StepConditionService,
    public cd: ChangeDetectorRef,
    private toggleControlService: ToggleControlService,
    private formService: NewCampaignRewardsStampsFormService
  ) {
    super(1, store, stepConditionService);
    this.initForm();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    const stampsNumber = Number.parseInt(oc(this.store.currentCampaign).template.nb_of_slots(0), 10);
    this.form.get('stampsRule.sequence').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value) {
          this.initSequenceRules(stampsNumber);
        } else {
          this.initUnsequenceRules();
        }
      });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }

  public get stampRule(): FormArray {
    return this.form.get('stampsRule.rules') as FormArray;
  }

  public get isSequence(): boolean {
    return this.form.get('stampsRule.sequence').value;
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
    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroy$)
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
