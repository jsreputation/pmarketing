import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map, switchMap } from 'rxjs/operators';
import { LoyaltyRulesHttpService } from '@cl-core/http-services/loyalty-rules-http.service';
import { LoyaltyRuleHttpAdapter } from '@cl-core/http-adapters/loyalty-rule-http-adapter';
import { JsonApiParser } from '@cl-helpers/json-api-parser';
import {
  IWLoyaltyRuleAttributes,
  IWLoyaltyRuleConditionAttributes,
  IWLoyaltyRulePointAttributes,
  IWLoyaltyRuleSetAttributes,
  IWOutcomeAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiItem
} from '@perx/whistler';
import { ILoyaltyRule, ILoyaltyRuleCondition, ILoyaltyRulePoint, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRuleService {

  constructor(private rulesHttpService: LoyaltyRulesHttpService) {
  }

  // RuleSet
  public getRuleSetList(params: HttpParamsOptions): Observable<IJsonApiListPayload<IWLoyaltyRuleSetAttributes>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleSetList(httpParams);
  }

  public findAndCreateRuleSet(tierType: string, tierId: string): Observable<ILoyaltyRuleSet> {
    const params = {
      include: 'domain,rules.rule_conditions,rules.results', //      'results',
      'filter[domain_id]': tierId,
      'filter[domain_type]': tierType
    };

    return this.getRuleSetList(params)
      .pipe(
        switchMap((response: IJsonApiListPayload<IWLoyaltyRuleSetAttributes>) => {
          if (response.data.length > 0) {
            return this.getRuleSetWithAdditionalData(response);
          }
          return this.createRuleSet(tierType, tierId);
        }),
      );
  }

  public getRuleSet(id: string, params: HttpParamsOptions): Observable<ILoyaltyRuleSet> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleSet(id, httpParams).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(response.data))
    );
  }

  private filterOutcomesArrayFromIncluded(response: IJsonApiListPayload<IWLoyaltyRuleSetAttributes>): IJsonApiItem<IWOutcomeAttributes>[] {
    return response.included
      .filter((entity: IJsonApiItem<any>) => entity.type === 'possible_outcomes' && entity.attributes.result_type === 'Perx::Loyalty::PointCalculator');
  }

  private getRuleSetWithAdditionalData(response: IJsonApiListPayload<IWLoyaltyRuleSetAttributes>): Observable<ILoyaltyRuleSet> {
    const outcomes = this.filterOutcomesArrayFromIncluded(response);
    if (outcomes.length > 0) {
      return this.getRuleSetPointsMapByPossibleOutcomes(outcomes).pipe(
        map((pointsMap: { [outcomeId: string]: ILoyaltyRulePoint }) =>
          LoyaltyRuleHttpAdapter.transformFromRuleSetWithIncludes(response, pointsMap))
      );
    }
    return of(LoyaltyRuleHttpAdapter.transformFromRuleSetWithIncludes(response));
  }

  private getRuleSetPointsMapByPossibleOutcomes(outcomes: any): Observable<{ [outcomeId: string]: ILoyaltyRulePoint }> {
    const pointRequest: Observable<ILoyaltyRulePoint>[] = outcomes.map(outcome => this.getRulePoint(outcome.attributes.result_id));
    return combineLatest(pointRequest).pipe(
      map(pointArray => {
        const pointsMap: { [possibleOutcomeId: string]: ILoyaltyRulePoint } = {};
        outcomes.forEach((outcome, index) => pointsMap[outcome.id] = pointArray[index]);
        return pointsMap;
      })
    );
  }

  public createRuleSet(typeTier: string, tierId: string): Observable<ILoyaltyRuleSet> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleSetFormCreate(typeTier, tierId);
    return this.rulesHttpService.createRuleSet({ data: sendData }).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>) => LoyaltyRuleHttpAdapter.transformToRuleSetForm(response.data))
    );
  }

  public updateRuleSet(ruleSet: ILoyaltyRuleSet): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleSetFormUpdate(ruleSet);
    return this.rulesHttpService.updateRuleSet(ruleSet.id, { data: sendData });
  }

  public deleteRuleSet(id: string): Observable<IJsonApiItemPayload<void>> {
    return this.rulesHttpService.deleteRuleSet(id);
  }

  // rules
  public getRule(id: string): Observable<ILoyaltyRule> {
    const params = {
      include: 'rule_conditions,results'
      // 'results'
    };
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRule(id, httpParams).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleAttributes>) => JsonApiParser.parseDataWithIncludes(
        response,
        LoyaltyRuleHttpAdapter.transformToRuleForm,
        {
          rule_conditions: { fieldName: 'conditions', adapterFunction: LoyaltyRuleHttpAdapter.transformToConditionForm },
          // point_calculators: {fieldName: 'results', adapterFunction: LoyaltyRuleHttpAdapter.transformPossibleOutcome},
        }
      ))
    );
  }

  public createRule(ruleSetId: string, data: any): Observable<ILoyaltyRule> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleForm(data, ruleSetId);
    return this.rulesHttpService.createRule({ data: sendData }).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public updateRule(data: any, ruleId: string): Observable<ILoyaltyRule> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromRuleFormUpdate(data);
    sendData.id = ruleId;
    return this.rulesHttpService.updateRule(ruleId, { data: sendData }).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToRuleForm(response.data))
    );
  }

  public deleteRule(id: string): Observable<IJsonApiItemPayload<void>> {
    return this.rulesHttpService.deleteRule(id);
  }

  // conditions
  public getRuleCondition(id: string, params: HttpParamsOptions): Observable<ILoyaltyRuleCondition> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRuleCondition(id, httpParams).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public createRuleCondition(ruleSetId: string, data: ILoyaltyRuleCondition): Observable<ILoyaltyRuleCondition> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromConditionForm(data, ruleSetId);
    return this.rulesHttpService.createRuleCondition({ data: sendData }).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public updateRuleCondition(ruleId: string, data: ILoyaltyRuleCondition, conditionId: string): Observable<ILoyaltyRuleCondition> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromConditionForm(data, ruleId);
    sendData.id = conditionId;
    return this.rulesHttpService.updateRuleCondition(conditionId, { data: sendData }).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRuleConditionAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToConditionForm(response.data))
    );
  }

  public deleteRuleCondition(id: string): Observable<IJsonApiItemPayload<ILoyaltyRuleCondition>> {
    return this.rulesHttpService.deleteRuleCondition(id);
  }

  // points
  public getRulePoint(id: string, params: HttpParamsOptions = {}): Observable<ILoyaltyRulePoint> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.rulesHttpService.getRulePoint(id, httpParams).pipe(
      map((response: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>) =>
        LoyaltyRuleHttpAdapter.transformToPointForm(response.data))
    );
  }

  public createRulePoint(data: ILoyaltyRulePoint):
    Observable<ILoyaltyRulePoint> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromPointForm(data);
    return this.rulesHttpService.createRulePoint({ data: sendData })
      .pipe(
        map((response: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>) =>
          LoyaltyRuleHttpAdapter.transformToPointForm(response.data))
      );
  }

  public updateRulePoint(id: string, data: ILoyaltyRulePoint):
    Observable<ILoyaltyRulePoint> {
    const sendData: any = LoyaltyRuleHttpAdapter.transformFromPointForm(data);
    sendData.id = id;
    return this.rulesHttpService.updateRulePoint(id, { data: sendData })
      .pipe(
        map((response: IJsonApiItemPayload<IWLoyaltyRulePointAttributes>) =>
          LoyaltyRuleHttpAdapter.transformToPointForm(response.data))
      );
  }

  public deleteRulePoint(id: string): Observable<IJsonApiItemPayload<IWLoyaltyRulePointAttributes>> {
    return this.rulesHttpService.deleteRulePoint(id);
  }
}
