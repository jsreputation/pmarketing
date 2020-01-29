import { FormGroup } from '@angular/forms';

export interface IRuleConditionOption {
  value: string;
  title: string;
  limit?: number;
}

export interface IConditionsBuilderConfig {
  conditionType: IRuleConditionOption[];
  [key: string]: any;
}

export interface IConditionsBuilderComponentMap {
  [key: string]: any;
}

export interface IConditionsBuilderGroupMap {
  [key: string]: (type: string) => FormGroup;
}

export interface IConditionsBuilderFormsService {
  groupMap: IConditionsBuilderGroupMap;
}
