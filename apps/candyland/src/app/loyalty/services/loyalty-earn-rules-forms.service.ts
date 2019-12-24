import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { ILoyaltyRule } from '@cl-core/models/loyalty/loyalty-rules.model';

@Injectable()
export class LoyaltyEarnRulesFormsService {

  public conditionGroups: { [key: string]: (type: string) => FormGroup } = {
    [RuleConditionType.transaction]: (type) => this.transactionGroup(type),
    [RuleConditionType.amount]: (type) => this.amountGroup(type),
    [RuleConditionType.currency]: (type) => this.currencyGroup(type),
    [RuleConditionType.fromDate]: (type) => this.fromDateGroup(type),
    [RuleConditionType.toDate]: (type) => this.toDateGroup(type),
  };

  public resultsGroups: { [type: string]: (type: string) => FormGroup } = {
    [RulePointType.bonus]: (type) => this.bonusGroup(type),
    [RulePointType.multiplier]: (type) => this.multiplierGroup(type),
  };

  public getRuleForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      mathMethod: new FormControl('first'),
      rules: new FormControl([]),
    });
  }

  public getRuleConditionsForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      conditions: new FormArray([]),
      result: this.createResultFormField(RulePointType.bonus)
    });
  }

  public getDefaultValue(): ILoyaltyRule {
    return {
      id: null,
      priority: 1,
      name: 'rule name',
      conditions: [{
        id: null,
        type: RuleConditionType.transaction,
        operator: RuleOperatorType.equal,
        value: 'prepaid',
        valueType: 'string',
      }],
      result: {
        id: null,
        amount: 1,
        applierType: RulePointType.bonus
      }
    };
  }

  public createConditionFormField(type: string): FormGroup {
    return this.conditionGroups[type](type) as FormGroup;
  }

  public createResultFormField(type: string): FormGroup {
    return this.resultsGroups[type](type) as FormGroup;
  }

  public transactionGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl(RuleOperatorType.equal, [Validators.required]),
      value: new FormControl('prepaid', [Validators.required]),
      valueType: new FormControl('string'),
    });
  }

  public currencyGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl(RuleOperatorType.equal, [Validators.required]),
      value: new FormControl('SGD', [Validators.required]),
      valueType: new FormControl('string'),
    });
  }

  public amountGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl(RuleOperatorType.equal, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
      valueType: new FormControl('integer'),
    });
  }

  public fromDateGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl(RuleOperatorType.greaterOrEqual, [Validators.required]),
      value: new FormControl(Date.now(), [Validators.required]),
      valueType: new FormControl('date')
    });
  }

  public toDateGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl(RuleOperatorType.lessOrEqual, [Validators.required]),
      value: new FormControl(Date.now(), [Validators.required]),
      valueType: new FormControl('date')
    });
  }

  public bonusGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      applierType: new FormControl(type),
      amount: new FormControl(1, [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }

  public multiplierGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      applierType: new FormControl(type),
      amount: new FormControl(1, [
        Validators.required,
        Validators.min(1)
      ]),
    });
  }
}
