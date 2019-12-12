import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { concatMap, filter, finalize, last, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '@cl-core/services/user.service';
import { BehaviorSubject, concat, from, Observable, of, Subject } from 'rxjs';
import { AudiencesService, ConfigService, SettingsService } from '@cl-core-services';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import Utils from '@cl-helpers/utils';
import { StatusLabel } from '@cl-helpers/status-label.enum';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IWBasicTierAttributes, IWPools } from '@perx/whistler';
import { RuleSetupPopupComponent } from '../rule-setup-popup/rule-setup-popup.component';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { StatusLabelConfig } from '@cl-shared/components/status-label/status-label.component';
import { ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-manage-loyalty-page',
  templateUrl: './manage-loyalty-page.component.html',
  styleUrls: ['./manage-loyalty-page.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class ManageLoyaltyPageComponent implements OnInit, OnDestroy {
  public loyaltyId: string;
  public basicTierId: string;
  public form: FormGroup;
  public stepProgress: number = null;
  private stepProgress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  public basicTierRuleSet: ILoyaltyRuleSet;
  public customTierRuleSetMap: {[id: string]: ILoyaltyRuleSet} = {};
  public ruleLoader: boolean = false;
  public pools: IWPools;
  public isEditPage: boolean = false;
  public showDraftButton: boolean = true;
  public prevFormValue: ILoyaltyForm;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  public statusLabel: { [key: string]: StatusLabelConfig };
  private currencyList: Currency[];
  private ruleOperators: OptionConfig[] = [
    {value: 'equal', title: '='},
    {value: 'unequal', title: '≠'},
    {value: 'less', title: '<'},
    {value: 'greater', title: '>'},
    {value: 'less_or_equal', title: '≤'},
    {value: 'greater_or_equal', title: '≥'},
  ];
  private transactionType: OptionConfig[] = [
    {value: 'prepaid', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.PREPAID'},
    {value: 'cod', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.COD'},
    {value: 'store', title: 'LOYALTY_FEATURE.TRANSACTION_TYPE.STORE'},
  ];
  private conditionType: { value: string, title: string, limit?: number }[] = [
    {value: 'transaction', title: 'LOYALTY_FEATURE.CONDITION_TYPE.TRANSACTION', limit: 2},
    {value: 'amount', title: 'LOYALTY_FEATURE.CONDITION_TYPE.AMOUNT', limit: 1},
    {value: 'currency', title: 'LOYALTY_FEATURE.CONDITION_TYPE.CURRENCY', limit: 1},
    {value: 'fromDate', title: 'LOYALTY_FEATURE.CONDITION_TYPE.FROM_DATE', limit: 1},
    {value: 'toDate', title: 'LOYALTY_FEATURE.CONDITION_TYPE.TO_DATE', limit: 1},
  ];
  protected destroy$: Subject<void> = new Subject();

  public get stepOne(): FormGroup {
    return this.form.get(this.loyaltyFormType.details) as FormGroup;
  }

  public get stepTwo(): FormGroup {
    return this.form.get(this.loyaltyFormType.tiers) as FormGroup;
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get customTiersCount(): AbstractControl {
    return this.form.get('customTiersCount');
  }

  public get currentStep(): number {
    return this.stepper ? this.stepper.selectedIndex : 0;
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  public get currency$(): Observable<string> {
    return this.userService.currency$;
  }

  constructor(
    private configService: ConfigService,
    private loyaltyFormsService: LoyaltyFormsService,
    private loyaltyService: LoyaltyService,
    private ruleService: LoyaltyRuleService,
    private settingsService: SettingsService,
    private customTierService: LoyaltyCustomTierService,
    private userService: UserService,
    private audiencesService: AudiencesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.initPools();
    this.initStatusesLabel();
    this.initForm();
    this.handleRouteParams()
      .subscribe(
        (loyalty: ILoyaltyForm) => this.initLoyaltyData(loyalty),
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/loyalty');
        }
      );
    this.stepProgress$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(stepProgress => {
        switch (stepProgress) {
          case 1:
            this.initCustomTiersDataSource();
            break;
          case 2:
            this.initCurrencyList();
            this.initAllRuleSet();
            break;
        }
        this.stepProgress = stepProgress;
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickGoNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isNotChangedFormValue()) {
      this.goNext();
      return;
    }

    this.getLoyaltyWithBasicTierRequest()
      .subscribe(() => {
        this.prevFormValue = this.form.value; // save current form value for checking changes in next step
        this.goNext();
      });
  }

  private goNext(): void {
    this.stepper.selected.completed = true;   // complete the current step
    this.stepper.next();                      // move to next step
    this.updateStepProgress();
  }

  private updateStepProgress(): void {
    if (this.currentStep > this.stepProgress$.value) {
      this.stepProgress$.next(this.currentStep);
    }
  }

  public saveAsDraft(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isNotChangedFormValue()) {
      this.navigateToList();
      return;
    }

    this.getLoyaltyWithBasicTierRequest()
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public launch(): void {
    const currentStatus = this.form.get('status').value;
    if (currentStatus && currentStatus !== StatusLabel.DRAFT) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.updateLoyaltyStatus(this.loyaltyId, StatusLabel.ACTIVE)
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public cancel(): void {
    if (!this.loyaltyId) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.deleteLoyalty(this.loyaltyId)
      .subscribe(() => this.navigateToList());

  }

  public navigateToList(): void {
    this.router.navigate(['/loyalty']);
  }

  public handleLoyaltyActions(data: { action: NewLoyaltyActions, data?: ICustomTireForm }): void {
    switch (data.action) {
      case NewLoyaltyActions.createTier:
        this.createCustomTire();
        break;
      case NewLoyaltyActions.editTier:
        this.editCustomTire(data.data);
        break;
      case NewLoyaltyActions.deleteTier:
        this.deleteCustomTier(data.data.id);
        break;
      case NewLoyaltyActions.createRule:
        this.createRule(data.data);
        break;
      case NewLoyaltyActions.editRule:
        this.editRule(data.data);
        break;
      case NewLoyaltyActions.deleteRule:
        this.deleteRule(data.data);
        break;
      case NewLoyaltyActions.dropRule:
        this.dropRule(data.data);
        break;
    }
  }

  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
  }

  private getRefDialogSetupTier(data: ICustomTireForm = null): Observable<MatDialogRef<TierSetupPopupComponent>> {
    const dialogRef: MatDialogRef<TierSetupPopupComponent> = this.dialog.open(TierSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        basicTierId: this.basicTierId,
        tier: data
      }
    });

    return dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      );
  }

  private createCustomTire(): void {
    this.getRefDialogSetupTier()
      .pipe(
        switchMap((tier) => {
          if (this.stepProgress >= 2) {
            return this.createCustomTierRuleSet(tier.id);
          }
          return of(tier);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateCustomTiersDataSource();
      });
  }

  private updateCustomTiersDataSource(): void {
    this.customTierDataSource.updateData();
    // this.customTiersCount.patchValue(this.customTierDataSource.length || 0);
  }

  private editCustomTire(data: ICustomTireForm): void {
    this.getRefDialogSetupTier(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private deleteCustomTier(id: string): void {
    this.customTierService.deleteCustomTier(id)
      .pipe(
        switchMap((response) => {
          if (this.stepProgress >= 2) {
            const ruleSetId = this.customTierRuleSetMap[id].id;
            return this.ruleService.deleteRuleSet(ruleSetId);
          }
          return of(response);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateCustomTiersDataSource();
      });
  }

  private initCustomTiersDataSource(): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<ICustomTireForm>(
        this.customTierService,
        20,
        {'filter[program_id]': this.loyaltyId});
    }
  }

  private getRefDialogSetupRule(data: any = null): Observable<MatDialogRef<RuleSetupPopupComponent>> {
    const dialogRef: MatDialogRef<RuleSetupPopupComponent> = this.dialog.open(RuleSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        ...data,
        config: {
          conditionType: this.conditionType,
          currencyList: this.currencyList,
          ruleOperators: this.ruleOperators,
          transactionType: this.transactionType
        }
      }
    });

    return dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      );
  }

  private createRule(data: any): void {
    this.getRefDialogSetupRule(data)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((rule) => {
        const updateRules = [...data.ruleSet.rules, rule];
        data.ruleSet.rules = updateRules;
        this.cd.detectChanges();
      });
  }

  private editRule(data: any): void {
    this.getRefDialogSetupRule(data)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((updatedRule) => {
        data.ruleSet.rules = Utils.updateAtArray(data.ruleSet.rules, data.rule, updatedRule);
        this.cd.detectChanges();
      });
  }

  private deleteRule(data: any): void {
    const ruleId = data.rule.id;
    this.ruleService.deleteRule(ruleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        data.ruleSet.rules = data.ruleSet.rules.filter(rule => rule.id !== ruleId);
        this.cd.detectChanges();
      });
  }

  private dropRule(data: any): void {
    const newRules = [...data.ruleSet.rules];
    moveItemInArray(newRules, data.prevIndex, data.currentIndex);
    data.ruleSet.rules = newRules;
  }

  private initPools(): void {
    this.audiencesService.getAudiencesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IWPools) => {
        this.pools = data;
      });
  }

  private getLoyaltyWithBasicTierRequest(): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    const newLoyalty = this.form.value;
    return this.loyaltyService.getLoyaltyRequest(newLoyalty, this.loyaltyId)
      .pipe(
        tap(loyalty => {
          this.loyaltyId = loyalty.id;
          this.form.get('createdAt').patchValue(loyalty.createdAt);
        }),
        switchMap(() => this.loyaltyService.getBasicTierRequest(newLoyalty, this.loyaltyId, this.basicTierId)),
        filter(Boolean),
        tap(basicTier => this.setBasicTierId(basicTier.data.id)),
        filter(Boolean),
        takeUntil(this.destroy$)
      );
  }

  private setBasicTierId(basicTierId: string): void {
    if (basicTierId && basicTierId !== this.basicTierId) {
      this.basicTierId = basicTierId;
      // this.setBasicTierIdToCustomTiersDataSourceFilter(this.loyaltyId);
    }
  }

  private handleRouteParams(): Observable<ILoyaltyForm | null> {
    return this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        switchMap(id => {
          if (id) {
            return this.loyaltyService.getLoyalty(id);
          }
          return of(null);
        }),
        takeUntil(this.destroy$)
      );
  }

  private initLoyaltyData(loyalty: ILoyaltyForm): void {
    if (loyalty) {
      this.loyaltyId = loyalty.id;
      this.setBasicTierId(loyalty.basicTierId);
      this.form.patchValue(loyalty);
      this.prevFormValue = this.form.value;
    } else {
      this.form.patchValue(this.getDefaultValue());
    }
    this.isEditPage = !!this.loyaltyId;
    this.showDraftButton = !loyalty || loyalty.status === StatusLabel.DRAFT;
  }

  private getDefaultValue(): ILoyaltyForm {
    return this.loyaltyFormsService.getDefaultValueForm();
  }

  private isNotChangedFormValue(): boolean {
    return Utils.isEqual(this.form.value, this.prevFormValue);
  }

  private getBasicTierRuleSet(): Observable<any> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::BasicTier', this.basicTierId)
      .pipe(
        tap(ruleSet => this.basicTierRuleSet = ruleSet),
        takeUntil(this.destroy$)
      );
  }

  private createCustomTierRuleSet(id: string): Observable<any> {
    this.ruleLoader = true;
    return this.ruleService.createRuleSet('Perx::Loyalty::CustomTier', id)
      .pipe(
        tap(ruleSet => this.customTierRuleSetMap[id] = ruleSet),
        filter(Boolean),
        finalize(() => this.ruleLoader = false)
      );
  }

  private getCustomTierRuleSet(id: string): Observable<any> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::CustomTier', id)
      .pipe(
        tap(ruleSet => this.customTierRuleSetMap[id] = ruleSet),
      );
  }

  private getAllCustomTierRuleSet(): Observable<any> {
    const customTierIds = this.customTierDataSource.data.map(item => item.id);
    return from(customTierIds).pipe(
      concatMap(id => this.getCustomTierRuleSet(id)),
    );
  }

  private initAllRuleSet(): void {
    this.ruleLoader = true;
    concat(this.getBasicTierRuleSet(), this.getAllCustomTierRuleSet())
      .pipe(
        filter(Boolean),
        tap(() => this.cd.detectChanges()),
        last(),
        finalize(() => this.ruleLoader = false),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
        },
        (error: Error) => console.warn(error.message)
      );
  }

  private initStatusesLabel(): void {
    this.configService.prepareStatusesLabel()
      .pipe(takeUntil(this.destroy$))
      .subscribe((statuses) => {
        this.statusLabel = statuses;
      });
  }

  private initCurrencyList(): void {
    this.settingsService.getCurrency()
      .pipe(takeUntil(this.destroy$))
      .subscribe(currencyList => this.currencyList = currencyList);
  }
}