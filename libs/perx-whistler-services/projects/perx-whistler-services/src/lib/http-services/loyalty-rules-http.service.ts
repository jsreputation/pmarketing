import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleSetAttributes,
  IWLoyaltyRulePointAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload
} from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class LoyaltyRulesHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  // RuleSets
  public getRuleSet(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(`${this.apiConfig.getLoyaltyRuleSetPath}/${id}`, { params });
  }

  public getRuleSetList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>>(this.apiConfig.getLoyaltyRuleSetPath, { params });
  }

  public createRuleSet(data: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(`${this.apiConfig.getLoyaltyRuleSetPath}/`, data);
  }

  public updateRuleSet(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>(`${this.apiConfig.getLoyaltyRuleSetPath}/${id}`, data);
  }

  public deleteRuleSet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.getLoyaltyRuleSetPath}/${id}`);
  }

  // rules
  public getRule(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(`${this.apiConfig.getLoyaltyRulePath}/${id}`, { params });
  }

  public getRuleList(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyRuleAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyRuleAttributes>>(this.apiConfig.getLoyaltyRulePath, { params });
  }

  public createRule(data: IJsonApiItemPayload<IWLoyaltyRuleAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(`${this.apiConfig.getLoyaltyRulePath}/`, data);
  }

  public updateRule(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRuleAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleAttributes>>(`${this.apiConfig.getLoyaltyRulePath}/${id}`, data);
  }

  public deleteRule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.getLoyaltyRulePath}/${id}`);
  }

  // conditions
  public getRuleCondition(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(
      `${this.apiConfig.getLoyaltyRuleConditionPath}/${id}`,
      { params }
    );
  }

  public createRuleCondition(data: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(`${this.apiConfig.getLoyaltyRuleConditionPath}/`, data);
  }

  public updateRuleCondition(id: string, data: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>>(
      `${this.apiConfig.getLoyaltyRuleConditionPath}/${id}`,
      data
    );
  }

  public deleteRuleCondition(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.getLoyaltyRuleConditionPath}/${id}`);
  }

  // points
  public getRulePoint(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>(
      `${this.apiConfig.getLoyaltyRulePointsCalculator}/${id}`,
      { params }
    );
  }

  public createRulePoint(data: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>(`${this.apiConfig.getLoyaltyRulePointsCalculator}/`, data);
  }

  public updateRulePoint(id: string, data: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>):
  Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>>(
      `${this.apiConfig.getLoyaltyRulePointsCalculator}/${id}`,
      data
    );
  }

  public deleteRulePoint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.getLoyaltyRulePointsCalculator}/${id}`);
  }
}
