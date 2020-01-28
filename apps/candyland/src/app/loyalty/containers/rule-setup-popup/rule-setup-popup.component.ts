import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { CRUDParser, RequestType } from '@cl-helpers/crud-parser';
import { ILoyaltyRule, ILoyaltyRuleCondition, ILoyaltyRulePoint, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';
import { TransactionConditionGroupComponent } from '../../components/transaction-condition-group/transaction-condition-group.component';
import { AmountConditionGroupComponent } from '../../components/amount-condition-group/amount-condition-group.component';
import { CurrencyConditionGroupComponent } from '../../components/currency-condition-group/currency-condition-group.component';
import { DateConditionGroupComponent } from '../../components/date-condition-group/date-condition-group.component';
import { BonusResultGroupComponent } from '../../components/bonus-result-group/bonus-result-group.component';
import { MultiplierResultGroupComponent } from '../../components/multiplier-result-group/multiplier-result-group.component';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public titleError: string;
  public isHideAddCondition: boolean = false;
  public conditionTypes: { [value: string]: number } = {};
  public loading: boolean = false;
  protected destroy$: Subject<void> = new Subject();
  public conditionComponentMap: { [type: string]: any } = {
    [RuleConditionType.transaction]: TransactionConditionGroupComponent,
    [RuleConditionType.amount]: AmountConditionGroupComponent,
    [RuleConditionType.currency]: CurrencyConditionGroupComponent,
    [RuleConditionType.fromDate]: DateConditionGroupComponent,
    [RuleConditionType.toDate]: DateConditionGroupComponent,
  };
  public conditionFormGroupMap: any;
  public resultsComponentsMap: { [type: string]: any } = {
    [RulePointType.bonus]: BonusResultGroupComponent,
    [RulePointType.multiplier]: MultiplierResultGroupComponent
  };

  public get name(): AbstractControl {
    return this.form.get('name') || null;
  }

  public get result(): AbstractControl {
    return this.form.get('result') || null;
  }

  public get conditions(): FormArray {
    return this.form.get('conditions') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<RuleSetupPopupComponent>,
    private formsService: LoyaltyEarnRulesFormsService,
    public ruleService: LoyaltyRuleService,
    @Inject(MAT_DIALOG_DATA) public data: { ruleSet: ILoyaltyRuleSet, rule?: ILoyaltyRule | null, config: any }
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    // this.handleConditionTypes();
    this.fillForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public addCondition(type: string = 'transaction'): void {
  //   this.conditions.push(this.formsService.createConditionFormField(type));
  // }
  //
  // public deleteCondition(index: number): void {
  //   this.conditions.removeAt(index);
  // }
  //
  // public updateCondition(data: {index: number, type: string}): void {
  //   const id = this.conditions.at(data.index).value.id;
  //   this.conditions.setControl(data.index, this.formsService.createConditionFormField(data.type));
  //   if (id) {
  //     this.conditions.at(data.index).get('id').patchValue(id);
  //   }
  // }

  public updateResult(type: string): void {
    const id = this.result.value.id;
    this.form.setControl('result', this.formsService.createResultFormField(type));
    if (id) {
      this.result.get('id').patchValue(id);
    }
  }

  // public handleConditionTypes(): void {
  //   this.conditions.valueChanges.pipe(
  //     map((conditions) => Utils.uniqValuesMap(conditions, 'type')),
  //     distinctUntilChanged(Utils.isEqual),
  //     map(conditions => this.data.config.conditionType.map(
  //       conditionType => ({...conditionType, hide: this.hideOption(conditionType, conditions)})
  //     )),
  //     tap(conditionsTypes => this.conditionTypes = conditionsTypes),
  //     map(conditionsTypes => !!conditionsTypes.find(condition => condition.hide === false)),
  //     takeUntil(this.destroy$)
  //   ).subscribe(conditionsTypes => this.isHideAddCondition = conditionsTypes);
  // }

  // public isHideOption(condition: any): boolean {
  //   return condition.value in this.conditionTypes &&
  //     'limit' in condition &&
  //     this.conditionTypes[condition.value] >= condition.limit;
  // }
  //
  // public hideOption(condition: any, conditions: any): boolean {
  //   return condition.value in conditions &&
  //     'limit' in condition && conditions[condition.value] >= condition.limit;
  // }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.getRuleRequest().subscribe(
      (rule) => {
        this.dialogRef.close(rule);
      },
      (error: any) => {
        this.loading = false;
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
    this.conditionFormGroupMap = this.formsService.conditionGroups;
    console.log('conditionFormGroupMap', this.conditionFormGroupMap);
  }

  private fillForm(): void {
    const pathValue = this.data.rule || this.formsService.getDefaultValue();
    // pathValue.conditions.forEach(() => this.addCondition());
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
    if (currentRule) {
      // update
      request = combineLatest(this.getAllUpdateRequests(currentRule, updatedRule))
        .pipe(
          map(() => currentRule.id)
        );
    } else {
      // create
      request = this.getAllCreateRequest(updatedRule, ruleSetId);
    }
    request = request.pipe(
      switchMap((id: string) => this.ruleService.getRule(id)),
      map((rule: any) => {
        rule.result = updatedRule.result;
        return rule;
      }),
      takeUntil(this.destroy$)
    );
    return request;
  }

  private getAllCreateRequest(updatedRule: ILoyaltyRule, ruleSetId: string): Observable<string> {
    return this.ruleService.createRulePoint(updatedRule.result)
      .pipe(
        map((resultPoint: ILoyaltyRulePoint) => {
          updatedRule.result = resultPoint;
          return updatedRule;
        }),
        switchMap(data => this.ruleService.createRule(ruleSetId, data)),
        map((rule: ILoyaltyRule) => rule.id)
      );
  }

  private getAllUpdateRequests(currentRule: ILoyaltyRule, updatedRule: ILoyaltyRule):
    Observable<ILoyaltyRule | ILoyaltyRuleCondition | ILoyaltyRulePoint>[] {
    const ruleId = currentRule.id;
    const requestArray: Observable<ILoyaltyRule | ILoyaltyRuleCondition | ILoyaltyRulePoint>[] =
      this.getConditionsRequests(ruleId, currentRule.conditions, updatedRule.conditions);
    if (currentRule.name !== updatedRule.name) {
      requestArray.push(this.ruleService.updateRule(updatedRule, ruleId));
    }
    if (!Utils.isEqual(currentRule.result, updatedRule.result)) {
      requestArray.push(this.ruleService.updateRulePoint(updatedRule.result.id, updatedRule.result));
    }
    return requestArray;
  }
}
