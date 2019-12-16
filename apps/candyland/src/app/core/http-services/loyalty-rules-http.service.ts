import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleSetAttributes,
  IWLoyaltyRulePointAttributes
} from '@perx/whistler';
import { ILoyaltyRuleCondition } from '@cl-core/models/loyalty/loyalty-rules.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRulesHttpService {

  constructor(private http: HttpClient) {
  }

  // RuleSets
  public getRuleSet(id: string, params: HttpParams): Observable<IJsonApiPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiPayload<IWLoyaltyRuleSetAttributes>>(`${ApiConfig.getLoyaltyRuleSetPath}/${id}`, {params});
  }

  public getRuleSetList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath, {params});
  }

  public createRuleSet(data: IJsonApiPayload<IWLoyaltyRuleSetAttributes>): Observable<IJsonApiPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.post<IJsonApiPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath + '/', data);
  }

  public updateRuleSet(id: string, data: IJsonApiPayload<IWLoyaltyRuleSetAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.patch<IJsonApiPayload<IWLoyaltyRuleSetAttributes>>(ApiConfig.getLoyaltyRuleSetPath + '/' + id, data);
  }

  public deleteRuleSet(id: string): Observable<IJsonApiPayload<void>> {
    return this.http.delete<IJsonApiPayload<void>>(ApiConfig.getLoyaltyRuleSetPath + '/' + id);
  }

  // rules
  public getRule(id: string, params: HttpParams): Observable<IJsonApiPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiPayload<IWLoyaltyRuleAttributes>>(`${ApiConfig.getLoyaltyRulePath}/${id}`, {params});
  }

  public getRuleList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath, {params});
  }

  public createRule(data: IJsonApiPayload<IWLoyaltyRuleAttributes>): Observable<IJsonApiPayload<IWLoyaltyRuleAttributes>> {
    return this.http.post<IJsonApiPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath + '/', data);
  }

  public updateRule(id: string, data: IJsonApiPayload<IWLoyaltyRuleAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRuleAttributes>> {
    return this.http.patch<IJsonApiPayload<IWLoyaltyRuleAttributes>>(ApiConfig.getLoyaltyRulePath + '/' + id, data);
  }

  public deleteRule(id: string): Observable<IJsonApiPayload<void>> {
    return this.http.delete<IJsonApiPayload<void>>(ApiConfig.getLoyaltyRulePath + '/' + id);
  }

  // conditions
  public getRuleCondition(id: string, params: HttpParams): Observable<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.get<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>>(`${ApiConfig.getLoyaltyRuleConditionPath}/${id}`, {params});
  }

  public createRuleCondition(data: IJsonApiPayload<IWLoyaltyRuleConditionAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.post<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>>(ApiConfig.getLoyaltyRuleConditionPath + '/', data);
  }

  public updateRuleCondition(id: string, data: IJsonApiPayload<IWLoyaltyRuleConditionAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.patch<IJsonApiPayload<IWLoyaltyRuleConditionAttributes>>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id, data);
  }

  public deleteRuleCondition(id: string): Observable<IJsonApiPayload<ILoyaltyRuleCondition>> {
    return this.http.delete<IJsonApiPayload<ILoyaltyRuleCondition>>(ApiConfig.getLoyaltyRuleConditionPath + '/' + id);
  }

  // points
  public getRulePoints(id: string, params: HttpParams): Observable<IJsonApiPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.get<IJsonApiPayload<IWLoyaltyRulePointAttributes>>(`${ApiConfig.getLoyaltyRulePointsCalculator}/${id}`, {params});
  }

  public createRulePoint(data: IJsonApiPayload<IWLoyaltyRulePointAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.post<IJsonApiPayload<IWLoyaltyRulePointAttributes>>(ApiConfig.getLoyaltyRulePointsCalculator + '/', data);
  }

  public updateRulePoint(id: string, data: IJsonApiPayload<IWLoyaltyRulePointAttributes>):
    Observable<IJsonApiPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.patch<IJsonApiPayload<IWLoyaltyRulePointAttributes>>(ApiConfig.getLoyaltyRulePointsCalculator + '/' + id, data);
  }

  public deleteRulePoint(id: string): Observable<IJsonApiPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.delete<IJsonApiPayload<IWLoyaltyRulePointAttributes>>(ApiConfig.getLoyaltyRulePointsCalculator + '/' + id);
  }
}
