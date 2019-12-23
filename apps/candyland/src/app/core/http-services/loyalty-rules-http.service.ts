import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleSetAttributes,
  IWLoyaltyRulePointAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRulesHttpService {

  constructor(private http: HttpClient) {
  }

  // RuleSets
  public getRuleSet(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(`${ApiConfig.getLoyaltyRuleSetPath}/${id}`, { params });
  }

  public getRuleSetList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath, { params });
  }

  public createRuleSet(data: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath + '/', data);
  }

  public updateRuleSet(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath + '/' + id, data);
  }

  public deleteRuleSet(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.getLoyaltyRuleSetPath + '/' + id);
  }

  // rules
  public getRule(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(`${ApiConfig.getLoyaltyRulePath}/${id}`, { params });
  }

  public getRuleList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath, { params });
  }

  public createRule(data: IJsonApiItemPayload<IWLoyaltyRuleAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath + '/', data);
  }

  public updateRule(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath + '/' + id, data);
  }

  public deleteRule(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.getLoyaltyRulePath + '/' + id);
  }

  // conditions
  public getRuleCondition(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(
      `${ApiConfig.getLoyaltyRuleConditionPath}/${id}`,
      { params }
    );
  }

  public createRuleCondition(data: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(ApiConfig.getLoyaltyRuleConditionPath + '/', data);
  }

  public updateRuleCondition(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id, data);
  }

  public deleteRuleCondition(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id);
  }

  // points
  public getRulePoint(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>
      (`${ApiConfig.getLoyaltyRulePointsCalculator}/${id}`, { params });
  }

  public createRulePoint(data: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>(ApiConfig.getLoyaltyRulePointsCalculator + '/', data);
  }

  public updateRulePoint(id: string, data: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>):
    Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>(ApiConfig.getLoyaltyRulePointsCalculator + '/' + id, data);
  }

  public deleteRulePoint(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.getLoyaltyRulePointsCalculator + '/' + id);
  }
}
