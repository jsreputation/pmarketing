import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  protected destroy$: Subject<void> = new Subject();

  public get name(): AbstractControl {
    return this.form.get('name') || null;
  }

  public get applyMultiplier(): AbstractControl {
    return this.form.get('pointsEarned.applyMultiplier');
  }

  public get awardPoints(): AbstractControl {
    return this.form.get('pointsEarned.awardPoints');
  }

  public get maximumPoints(): AbstractControl {
    return this.form.get('pointsEarned.maximumPoints');
  }

  public get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<RuleSetupPopupComponent>,
    private formsService: LoyaltyEarnRulesFormsService,
    @Inject(MAT_DIALOG_DATA) public data: { rule: string, tier: ICustomTireForm | null }
  ) {
  }

  public ngOnInit(): void {
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
    // let request;
    if (this.data.tier) {
      // request = this.customTierService.updateCustomTier(this.data.tier.id, this.form.value, this.data.basicTierId);
    } else {
      // request = this.customTierService.createCustomTier(this.form.value, this.data.basicTierId);
    }
    // request.subscribe(data => this.dialogRef.close(data));
  }

  private initForm(): void {
    this.form = this.formsService.getForm();
  }

  private fillForm(): void {
    const pathValue = this.data.rule || this.formsService.getDefaultValue();
    this.form.patchValue(pathValue);
  }
}
