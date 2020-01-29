import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';
import { RuleOperatorType } from '@cl-core/models/loyalty/rule-operator-type.enum';
import { IConditionsBuilderFormsService, IConditionsBuilderGroupMap } from './conditions-builder.models';

@Injectable()
export class ConditionsBuilderFormsService implements IConditionsBuilderFormsService {

  public groupMap: IConditionsBuilderGroupMap = {
    [RuleConditionType.transaction]: (type) => this.transactionGroup(type),
    [RuleConditionType.amount]: (type) => this.amountGroup(type),
    [RuleConditionType.currency]: (type) => this.currencyGroup(type),
    [RuleConditionType.fromDate]: (type) => this.fromDateGroup(type),
    [RuleConditionType.toDate]: (type) => this.toDateGroup(type),
  };

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
