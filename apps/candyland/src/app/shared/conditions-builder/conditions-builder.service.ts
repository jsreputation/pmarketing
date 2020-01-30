import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { TransactionConditionGroupComponent } from './transaction-condition-group/transaction-condition-group.component';
import { AmountConditionGroupComponent } from './amount-condition-group/amount-condition-group.component';
import { CurrencyConditionGroupComponent } from './currency-condition-group/currency-condition-group.component';
import { DateConditionGroupComponent } from './date-condition-group/date-condition-group.component';

@Injectable()
export class ConditionsBuilderService {

  public componentMap: { [type: string]: any } = {
    [RuleConditionType.transaction]: TransactionConditionGroupComponent,
    [RuleConditionType.amount]: AmountConditionGroupComponent,
    [RuleConditionType.currency]: CurrencyConditionGroupComponent,
    [RuleConditionType.fromDate]: DateConditionGroupComponent,
    [RuleConditionType.toDate]: DateConditionGroupComponent,
  };

  public groupMap: { [key: string]: (type: string) => FormGroup } = {
    [RuleConditionType.transaction]: (type) => this.transactionGroup(type),
    [RuleConditionType.amount]: (type) => this.amountGroup(type),
    [RuleConditionType.currency]: (type) => this.currencyGroup(type),
    [RuleConditionType.fromDate]: (type) => this.fromDateGroup(type),
    [RuleConditionType.toDate]: (type) => this.toDateGroup(type),
  };

  // public createConditionFormField(type: string): FormGroup {
  //   return this.groupMap[type](type) as FormGroup;
  // }

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
}
