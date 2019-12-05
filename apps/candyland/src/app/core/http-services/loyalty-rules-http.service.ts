import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRulesHttpService {

  constructor(private http: HttpClient) {
  }

  public getRuleSet(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getLoyaltyRuleSetPath}/${id}`, {params});
  }

  public getRuleSetList(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.getLoyaltyRuleSetPath, {params});
  }

  public createRuleSet(data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleSetPath + '/', data);
  }

  public updateRuleSet(id: string, data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleSetPath + '/' + id, data);
  }

  public deleteRuleSet(id: string): Observable<IJsonApiPayload<any>> {
    return this.http.delete<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleSetPath + '/' + id);
  }

  public getRule(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getLoyaltyRulePath}/${id}`, {params});
  }

  public getRuleList(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.getLoyaltyRulePath, {params});
  }

  public createRule(data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRulePath + '/', data);
  }

  public updateRule(id: string, data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRulePath + '/' + id, data);
  }

  public deleteRule(id: string): Observable<IJsonApiPayload<any>> {
    return this.http.delete<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRulePath + '/' + id);
  }

  public getRuleCondition(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getLoyaltyRuleConditionPath}/${id}`, {params});
  }

  public createRuleCondition(data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleConditionPath + '/', data);
  }

  public updateRuleCondition(id: string, data: IJsonApiPayload<any>): Observable<IJsonApiPayload<any>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id, data);
  }

  public deleteRuleCondition(id: string): Observable<IJsonApiPayload<any>> {
    return this.http.delete<IJsonApiPayload<any>>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id);
  }
}
