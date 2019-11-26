import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  protected destroy$: Subject<void> = new Subject();
  public titleError: string;

  public get name(): AbstractControl {
    return this.form.get('name') || null;
  }

  public get applyMultiplier(): AbstractControl {
    return this.form.get('result.applyMultiplier');
  }

  public get awardPoints(): AbstractControl {
    return this.form.get('result.awardPoints');
  }

  public get maximumPoints(): AbstractControl {
    return this.form.get('result.maximumPoints');
  }

  public get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<RuleSetupPopupComponent>,
    private formsService: LoyaltyEarnRulesFormsService,
    private ruleService: LoyaltyRuleService,
    @Inject(MAT_DIALOG_DATA) public data: { ruleSet: any, rule?: any | null }
  ) {
  }

  public ngOnInit(): void {
    console.log('initData', this.data);
    this.initForm();
    this.fillForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addCondition(type: string = 'transaction'): void {
    this.conditions.push(this.formsService.createFormField(type));
  }

  public deleteCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  public updateCondition(index: number, type: string): void {
    this.deleteCondition(index);
    this.conditions.insert(index, this.formsService.createFormField(type));
  }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request;
    if (this.data.rule) {
      request = this.ruleService.updateRule(this.data.ruleSet.id, this.form.value, this.data.rule.id);
    } else {
      request = this.ruleService.createRule(this.data.ruleSet.id, this.form.value);
    }
    request.subscribe(
      data => this.dialogRef.close(data),
      (error: any) => {
        this.titleError = error.error.errors.find(item => 'title' in item).title;
        if (this.titleError) {
          this.name.setErrors({title: true});
          this.name.markAllAsTouched();
        }
      }
    );
  }

  private initForm(): void {
    this.form = this.formsService.getRuleConditionsForm();
  }

  private fillForm(): void {
    const pathValue = this.data.rule || this.formsService.getDefaultValue();
    console.log('pathValue', pathValue);
    pathValue.conditions.forEach(() => this.addCondition());
    this.form.patchValue(pathValue);
  }
}
