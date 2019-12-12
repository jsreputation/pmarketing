import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoyaltyEarnRulesFormsService {

  public conditionGroups: { [key: string]: any } = {
    transaction: (type) => this.transactionGroup(type),
    amount: (type) => this.amountGroup(type),
    currency: (type) => this.currencyGroup(type),
    fromDate: (type) => this.fromDateGroup(type),
    toDate: (type) => this.toDateGroup(type),
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
      // priority: new FormControl(null),
      name: new FormControl(null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      conditions: new FormArray([]),
      // result: new FormGroup({
      //   typePoints: new FormControl(null, [Validators.required]),
      //   awardPoints: new FormControl(null, [Validators.required, Validators.min(1)]),
      //   typeMultiplier: new FormControl(null, [Validators.required]),
      //   applyMultiplier: new FormControl(null, [Validators.required, Validators.min(1)]),
      //   maximumPoints: new FormControl(null, [Validators.required, Validators.min(1)])
      // })
    });
  }

  public getDefaultValue(): any {
    return {
      priority: 1,
      name: 'rule name',
      conditions: [{
        type: 'transaction',
        operator: 'equal',
        value: 'prepaid',
        valueType: 'string',
      }],
      // result: {
      //   typePoints: 'bonus',
      //   awardPoints: 100,
      //   typeMultiplier: 'multiplier',
      //   applyMultiplier: 2,
      //   maximumPoints: 3
      // }
    };
  }

  public createFormField(type: string): FormGroup {
    return this.conditionGroups[type](type) as FormGroup;
  }

  public transactionGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl('equal', [Validators.required]),
      value: new FormControl('prepaid', [Validators.required]),
      valueType: new FormControl('string'),
    });
  }

  public currencyGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl('equal', [Validators.required]),
      value: new FormControl('SGD', [Validators.required]),
      valueType: new FormControl('string'),
    });
  }

  public amountGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl('equal', [Validators.required]),
      value: new FormControl(0, [Validators.required]),
      valueType: new FormControl('integer'),
    });
  }

  public fromDateGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl('greater_or_equal', [Validators.required]),
      value: new FormControl(Date.now(), [Validators.required]),
      valueType: new FormControl('date')
    });
  }

  public toDateGroup(type: string): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      type: new FormControl(type),
      operator: new FormControl('less_or_equal', [Validators.required]),
      value: new FormControl(Date.now(), [Validators.required]),
      valueType: new FormControl('date')
    });
  }
}
