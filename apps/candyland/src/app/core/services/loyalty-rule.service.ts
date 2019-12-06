import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map, switchMap } from 'rxjs/operators';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyRulesHttpService } from '@cl-core/http-services/loyalty-rules-http.service';
import { LoyaltyRuleHttpAdapter } from '@cl-core/http-adapters/loyalty-rule-http-adapter';
import { JsonApiParser } from '@cl-helpers/json-api-parser';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRuleService {

  constructor(private rulesHttpService: LoyaltyRulesHttpService) {
  }

  // public getTableData(params: HttpParamsOptions): Observable<ITableData<ICustomTireForm>> {
  //   const httpParams = ClHttpParams.createHttpParams(params);
  //   return this.rulesHttpService.getCustomTiers(httpParams).pipe(
  //     map(response => LoyaltyHttpAdapter.transformToTableDataCustomTierForm(response))
  //   );
  // }

  public getRuleSetList(params: HttpParamsOptions): Observable<any> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleSetList(httpParams);
  }

  public findAndCreateRuleSet(tierType: string, tierId: string): Observable<any> {
    const params = {
      include: 'domain,rules.rule_conditions',
      'filter[domain_id]': tierId,
      'filter[domain_type]': tierType
    };
    return this.getRuleSetList(params)
      .pipe(
        switchMap((response: any) => {
          if (response.data.length > 0) {
            return of(LoyaltyRuleHttpAdapter.transformFromRuleSetWithIncludes(response));
          }
          return this.createRuleSet(tierType, tierId);
        }),
      );
  }

  public getRuleSet(id: string, params: HttpParamsOptions): Observable<ICustomTireForm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleSet(id, httpParams).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(response.data))
    );
  }

  public createRuleSet(data: any, basicTierId: string): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleSetForm(data, basicTierId);
    return this.rulesHttpService.createRuleSet({data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(response.data))
    );
  }

  public updateRuleSet(RuleSetId: string, data: any, basicTierId: string): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleSetForm(data, basicTierId);
    sendData.id = RuleSetId;
    return this.rulesHttpService.updateRuleSet(RuleSetId, {data: sendData});
  }

  public deleteRuleSet(id: string): Observable<IJsonApiPayload<any>> {
    return this.rulesHttpService.deleteRuleSet(id);
  }

  public getRule(id: string): Observable<ICustomTireForm> {
    const params = {
      include: 'rule_conditions'
    };
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRule(id, httpParams).pipe(
      map((response: any) => JsonApiParser.parseDataWithIncludes(
        response,
        LoyaltyRuleHttpAdapter.transformToRuleForm,
        {
          rule_conditions: {fieldName: 'conditions', adapterFunction: LoyaltyRuleHttpAdapter.transformToConditionForm}
        }
      ))
    );
  }

  public createRule(ruleSetId: string, data: any): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleForm(data, ruleSetId);
    return this.rulesHttpService.createRule({data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public updateRule(data: any, ruleId: string): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleFormUpdate(data);
    sendData.id = ruleId;
    return this.rulesHttpService.updateRule(ruleId, {data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public deleteRule(id: string): Observable<IJsonApiPayload<any>> {
    return this.rulesHttpService.deleteRule(id);
  }

  public getRuleCondition(id: string, params: HttpParamsOptions): Observable<ICustomTireForm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleCondition(id, httpParams).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public createRuleCondition(ruleSetId: string, data: any): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromConditionForm(data, ruleSetId);
    return this.rulesHttpService.createRuleCondition({data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public updateRuleCondition(ruleId: string, data: any, conditionId: string): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromConditionForm(data, ruleId);
    sendData.id = conditionId;
    return this.rulesHttpService.updateRuleCondition(conditionId, {data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public deleteRuleCondition(id: string): Observable<IJsonApiPayload<any>> {
    return this.rulesHttpService.deleteRuleCondition(id);
  }
}
