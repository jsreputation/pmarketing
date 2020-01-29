import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { ILoyaltyRule } from '@cl-core/models/loyalty/loyalty-rules.model';

@Injectable()
export class LoyaltyEarnRulesFormsService {

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
      conditions: new FormControl([]),
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

  public createResultFormField(type: string): FormGroup {
    return this.resultsGroups[type](type) as FormGroup;
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
