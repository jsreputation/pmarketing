import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoyaltyEarnRulesFormsService } from '../../services/loyalty-earn-rules-forms.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { CRUDParser, RequestType } from '@cl-helpers/crud-parser';
import { ILoyaltyRule, ILoyaltyRuleCondition, ILoyaltyRulePoint, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';
import { BonusResultGroupComponent } from '../../components/bonus-result-group/bonus-result-group.component';
import { MultiplierResultGroupComponent } from '../../components/multiplier-result-group/multiplier-result-group.component';
import { RulePointType } from '@cl-core/models/loyalty/rule-point-type.enum';

@Component({
  selector: 'cl-rule-setup-popup',
  templateUrl: './rule-setup-popup.component.html',
  styleUrls: ['./rule-setup-popup.component.scss']
})
export class RuleSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public titleError: string;
  public loading: boolean = false;
  protected destroy$: Subject<void> = new Subject();
  public resultsComponentsMap: { [type: string]: any } = {
    [RulePointType.bonus]: BonusResultGroupComponent,
    [RulePointType.multiplier]: MultiplierResultGroupComponent
  };

  public get name(): AbstractControl {
    return this.form.get('name') || null;
  }

  public get result(): AbstractControl {
    return this.form.get('result') || null;
  }

  public get conditions(): AbstractControl {
    return this.form.get('conditions') || null;
  }

  constructor(
    public dialogRef: MatDialogRef<RuleSetupPopupComponent>,
    private formsService: LoyaltyEarnRulesFormsService,
    public ruleService: LoyaltyRuleService,
    @Inject(MAT_DIALOG_DATA) public data: { ruleSet: ILoyaltyRuleSet, rule?: ILoyaltyRule | null, config: any }
  ) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.fillForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public updateResult(type: string): void {
    const id = this.result.value.id;
    this.form.setControl('result', this.formsService.createResultFormField(type));
    if (id) {
      this.result.get('id').patchValue(id);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.getRuleRequest().subscribe(
      (rule) => {
        this.dialogRef.close(rule);
      },
      (error: any) => {
        this.loading = false;
        this.titleError = error.error.errors.find(item => item.source.pointer === '/data/attributes/name').title;
        if (this.titleError) {
          this.name.setErrors({title: true});
          this.name.markAllAsTouched();
        }
      }
    );
  }

  private initForm(): void {
    this.form = this.formsService.getRuleConditionsForm();
  }

  private fillForm(): void {
    const pathValue = this.data.rule || this.formsService.getDefaultValue();
    this.form.patchValue(pathValue);
  }

  private getConditionsRequests(ruleId: string, currentConditions: any[], updatedConditions: any[]): Observable<ILoyaltyRuleCondition>[] {
    return CRUDParser.buildRequestList<ILoyaltyRuleCondition>(currentConditions, updatedConditions, (type, data) => {
      switch (type) {
        case RequestType.CREATE:
          return this.ruleService.createRuleCondition(ruleId, data);
        case RequestType.UPDATE:
          return this.ruleService.updateRuleCondition(ruleId, data, data.id);
        case RequestType.DELETE:
          return this.ruleService.deleteRuleCondition(data.id);
      }
    });
  }

  private getRuleRequest(): Observable<any> {
    let request;
    const ruleSetId = this.data.ruleSet.id;
    const currentRule = this.data.rule;
    const updatedRule = this.form.value;
    if (currentRule) {
      // update
      request = combineLatest(this.getAllUpdateRequests(currentRule, updatedRule))
        .pipe(
          map(() => currentRule.id)
        );
    } else {
      // create
      request = this.getAllCreateRequest(updatedRule, ruleSetId);
    }
    request = request.pipe(
      switchMap((id: string) => this.ruleService.getRule(id)),
      map((rule: any) => {
        rule.result = updatedRule.result;
        return rule;
      }),
      takeUntil(this.destroy$)
    );
    return request;
  }

  private getAllCreateRequest(updatedRule: ILoyaltyRule, ruleSetId: string): Observable<string> {
    return this.ruleService.createRulePoint(updatedRule.result)
      .pipe(
        map((resultPoint: ILoyaltyRulePoint) => {
          updatedRule.result = resultPoint;
          return updatedRule;
        }),
        switchMap(data => this.ruleService.createRule(ruleSetId, data)),
        map((rule: ILoyaltyRule) => rule.id)
      );
  }

  private getAllUpdateRequests(currentRule: ILoyaltyRule, updatedRule: ILoyaltyRule):
  Observable<ILoyaltyRule | ILoyaltyRuleCondition | ILoyaltyRulePoint>[] {
    const ruleId = currentRule.id;
    const requestArray: Observable<ILoyaltyRule | ILoyaltyRuleCondition | ILoyaltyRulePoint>[] =
      this.getConditionsRequests(ruleId, currentRule.conditions, updatedRule.conditions);
    if (currentRule.name !== updatedRule.name) {
      requestArray.push(this.ruleService.updateRule(updatedRule, ruleId));
    }
    if (!Utils.isEqual(currentRule.result, updatedRule.result)) {
      requestArray.push(this.ruleService.updateRulePoint(updatedRule.result.id, updatedRule.result));
    }
    return requestArray;
  }
}
