import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { concatAll, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { CRUDParser } from '@cl-helpers/crud-parser';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  protected destroy$: Subject<void> = new Subject();
  public titleError: string;
  public conditionTypes: OptionConfig[];

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
    @Inject(MAT_DIALOG_DATA) public data: { ruleSet: any, rule?: any | null, config: any }
  ) {
  }

  public ngOnInit(): void {
    console.log('initData', this.data);
    this.initForm();
    this.fillForm();
    this.handleConditionTypes();
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
    const id = this.conditions.at(index).value.id;
    // this.deleteCondition(index);
    this.conditions.setControl(index, this.formsService.createFormField(type));
    if (id) {
      this.conditions.at(index).get('id').patchValue(id);
    }
    // this.conditions.insert(index, this.formsService.createFormField(type));
  }

  public handleConditionTypes(): void {
    this.conditions.valueChanges.pipe(
      distinctUntilChanged(Utils.isEqual),
      map(conditions => conditions.map(condition => condition.type)),
      tap(conditions => console.log(conditions)),
      // map(selectedConditions => this.data.config.conditionType.filter(
      //   conditionType => !selectedConditions.includes(conditionType.value))
      // ),
      // tap(conditions => console.log('2', conditions)),
      takeUntil(this.destroy$)
    ).subscribe(avaibleConditionsTypes => this.conditionTypes = avaibleConditionsTypes);
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
    debugger
    if (this.data.rule) {
      // request = this.ruleService.updateRule(this.data.ruleSet.id, this.form.value, this.data.rule.id);
    //   const current = this.data.rule.conditions;
    //   const updated = this.form.value.conditions;
    //   const requestList = CRUDParser.buildRequestList(current, updated);
    //   const sendRequestList = CRUDParser.sendRequestList(requestList, {
    //     create: this.ruleService.createRuleCondition,
    //     update: this.ruleService.updateRuleCondition,
    //     delete: this.ruleService.deleteRuleCondition
    //   }, [this.data.rule.id]);
    //   concatAll(sendRequestList)
    // } else {
    //   request = this.ruleService.createRule(this.data.ruleSet.id, this.form.value);
    }
    request.subscribe(
      rule => {
        // TODO: change conditions get from API which conditions CRUD finished
        const ruleWithConditions = {...rule, conditions: this.conditions.value};
        this.dialogRef.close(ruleWithConditions);
      },
      (error: any) => {
        this.titleError = error.error.errors.find(item => item.source.pointer === '/data/attributes/name').title;
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
    console.log('pathValue', pathValue, pathValue.conditions);
    pathValue.conditions.forEach(() => this.addCondition());
    this.form.patchValue(pathValue);
  }

}
