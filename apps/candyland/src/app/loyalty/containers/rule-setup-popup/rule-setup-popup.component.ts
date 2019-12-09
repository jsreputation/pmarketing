import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { CRUDParser, RequestType } from '@cl-helpers/crud-parser';
import { ILoyaltyRuleCondition } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  protected destroy$: Subject<void> = new Subject();
  public titleError: string;
  public isHideAddCondition: boolean = false;
  public conditionTypes: { [value: string]: number } = {};

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
    public ruleService: LoyaltyRuleService,
    @Inject(MAT_DIALOG_DATA) public data: { ruleSet: any, rule?: any | null, config: any }
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.handleConditionTypes();
    this.fillForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addCondition(type: string = 'transaction'): void {
    console.log('closed', type);
    this.conditions.push(this.formsService.createFormField(type));
  }

  public deleteCondition(index: number): void {
    this.conditions.removeAt(index);
  }

  public updateCondition(index: number, type: string): void {
    const id = this.conditions.at(index).value.id;
    this.conditions.setControl(index, this.formsService.createFormField(type));
    if (id) {
      this.conditions.at(index).get('id').patchValue(id);
    }
  }

  public handleConditionTypes(): void {
    this.conditions.valueChanges.pipe(
      map((conditions) => Utils.uniqValuesMap(conditions, 'type')),
      distinctUntilChanged(Utils.isEqual),
      map(conditions => this.data.config.conditionType.map(
        conditionType => ({...conditionType, hide: this.hideOption(conditionType, conditions)})
      )),
      tap(conditionsTypes => this.conditionTypes = conditionsTypes),
      map(conditionsTypes => !!conditionsTypes.find(condition => condition.hide === false)),
      tap(conditionsTypes => this.isHideAddCondition = conditionsTypes),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public isHideOption(condition: any): boolean {
    return condition.value in this.conditionTypes &&
      'limit' in condition &&
      this.conditionTypes[condition.value] >= condition.limit;
  }

  public hideOption(condition: any, conditions: any): boolean {
    return condition.value in conditions &&
      'limit' in condition && conditions[condition.value] >= condition.limit;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.getRuleRequest().subscribe(
      rule => this.dialogRef.close(rule),
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
    pathValue.conditions.forEach(() => this.addCondition());
    this.form.patchValue(pathValue);
  }

  private getConditionsRequests(ruleId: string, currentConditions: any[], updatedConditions: any[]): Observable<ILoyaltyRuleCondition>[] {
    return CRUDParser.buildRequestList<ILoyaltyRuleCondition>(currentConditions, updatedConditions, (type, data) => {
      switch (type) {
        case RequestType.CREATE:
          return this.ruleService.createRuleCondition(ruleId, data);
        case RequestType.UPDATE:
          return this.ruleService.updateRuleCondition(ruleId, data, data.id);
        case RequestType.DELETE:
          return this.ruleService.deleteRuleCondition(data.id);
      }
    });
  }

  private getRuleRequest(): Observable<any> {
    let request;
    const ruleSetId = this.data.ruleSet.id;
    const currentRule = this.data.rule;
    const updatedRule = this.form.value;
    console.log('updatedRule', updatedRule);
    if (currentRule) {
      const ruleId = this.data.rule.id;
      request = combineLatest([
        this.ruleService.updateRule(updatedRule, ruleId),
        ...this.getConditionsRequests(ruleId, currentRule.conditions, updatedRule.conditions)
      ])
        .pipe(
          map(() => ruleId)
        );
    } else {
      request = this.ruleService.createRule(ruleSetId, updatedRule).pipe(
        map((rule: any) => rule.id)
      );
    }
    request = request.pipe(
      switchMap((id: string) => this.ruleService.getRule(id)),
      takeUntil(this.destroy$)
    );
    return request;
  }

}
