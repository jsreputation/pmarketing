import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map, switchMap } from 'rxjs/operators';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyRulesHttpService } from '@cl-core/http-services/loyalty-rules-http.service';
import { LoyaltyRuleHttpAdapter } from '@cl-core/http-adapters/loyalty-rule-http-adapter';

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
            console.log('find');
            return of(LoyaltyRuleHttpAdapter.transformFromRuleSetWithIncludes(response));
          }
          console.log('create');
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
    console.log('sendData', sendData);
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

  public getRule(id: string, params: HttpParamsOptions): Observable<ICustomTireForm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRule(id, httpParams).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public createRule(ruleSetId: string, data: any): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleForm(data, ruleSetId);
    return this.rulesHttpService.createRule({data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public updateRule(ruleSetId: string, data: any, ruleId: string): Observable<IJsonApiPayload<any>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleForm(data, ruleSetId);
    sendData.id = ruleId;
    return this.rulesHttpService.updateRule(ruleId, {data: sendData}).pipe(
      map((response: any) => LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public deleteRule(id: string): Observable<IJsonApiPayload<any>> {
    return this.rulesHttpService.deleteRule(id);
  }
}
