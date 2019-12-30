import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { concatMap, defaultIfEmpty, filter, finalize, last, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { BehaviorSubject, combineLatest, concat, from, Observable, of, Subject } from 'rxjs';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import Utils from '@cl-helpers/utils';
import { StatusLabel } from '@cl-helpers/status-label.enum';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IWBasicTierAttributes, IJsonApiItemPayload, IWLoyaltyRuleSetAttributes } from '@perx/whistler';
import { RuleSetupPopupComponent } from '../rule-setup-popup/rule-setup-popup.component';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ILoyaltyRule, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';
import { LoyaltyConfigService } from '../../services/loyalty-config.service';

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
  public prevFormValue: ILoyaltyForm;
  public stepProgress: number = null;
  public loading: boolean = false;
  public basicTierRuleSet: ILoyaltyRuleSet;
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  public customTierRuleSetMap: { [id: string]: ILoyaltyRuleSet } = {};
  public manageConfig: any;
  public ruleSetupDialogConfig: any;
  public viewConfig: any;
  public isEditPage: boolean = false;
  public showDraftButton: boolean = true;
  private stepProgress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  protected destroy$: Subject<void> = new Subject();

  public get firstStepForm(): FormGroup {
    return this.form.get(this.loyaltyFormType.details) as FormGroup;
  }

  public get secondStepForm(): FormGroup {
    return this.form.get(this.loyaltyFormType.tiers) as FormGroup;
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get customTiersCount(): AbstractControl {
    return this.form.get('customTiersCount');
  }

  public get currentStepIndex(): number {
    return this.stepper ? this.stepper.selectedIndex : 0;
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  constructor(
    private loyaltyFormsService: LoyaltyFormsService,
    private loyaltyService: LoyaltyService,
    private ruleService: LoyaltyRuleService,
    private customTierService: LoyaltyCustomTierService,
    private configService: LoyaltyConfigService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.initConfigs();
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
      takeUntil(this.destroy$)
    ).subscribe(stepProgress => {
        switch (stepProgress) {
          case 1:
            this.initCustomTiersDataSource();
            break;
          case 2:
            this.initAllRuleSet();
            break;
        }
        this.stepProgress = stepProgress;
      }
    );

    this.loading$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(loading => {
      this.loading = loading;
      this.cd.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // events
  public clickCancel(): void {
    this.setLoading(true);
    if (!this.loyaltyId) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.deleteLoyalty(this.loyaltyId)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.navigateToList());
  }

  public clickStepLabel(event: StepperSelectionEvent): void {
    console.log(event);
    if (event.selectedIndex === event.previouslySelectedIndex || event.selectedIndex > this.stepProgress + 1) {
      return;
    }
    console.log('yes');
    this.setLoading(true);
    this.getSaveByStep(event.previouslySelectedIndex)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((isUpdated: boolean) => {
        if (isUpdated) {
          this.stepper.selected.completed = true;   // complete the current step
          this.stepper.selected = event.selectedStep;
          // if (event.previouslySelectedIndex > this.stepProgress) {
          this.updateStepProgress();
          // }
        }
      });
  }

  public clickGoNext(): void {
    this.setLoading(true);
    this.getSaveByStep(this.currentStepIndex)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((isUpdated: boolean) => {
        if (isUpdated) {
          this.goNext();
        }
      });
  }

  public clickSaveAsDraft(): void {
    this.setLoading(true);
    this.getSaveByStep(this.currentStepIndex)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((isUpdated: boolean) => {
        if (isUpdated) {
          this.navigateToList();
        }
      });
  }

  public clickLaunch(): void {
    this.setLoading(true);
    const currentStatus = this.form.get('status').value;
    if (currentStatus && currentStatus !== StatusLabel.DRAFT) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.updateLoyaltyStatus(this.loyaltyId, StatusLabel.ACTIVE)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public clickBack(): void {
    this.navigateToList();
  }

  public handleLoyaltyActions(data: { action: NewLoyaltyActions, data?: any }): void {
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
      case NewLoyaltyActions.updateRuleSetMatchType:
        this.updateRuleSetMatchType(data.data);
        break;
    }
  }

  private getSaveByStep(currentStep: number): Observable<boolean> {
    switch (currentStep) {
      case 0:
        return this.getFirstStepSaveRequest();
      case 1:
        return this.getSecondStepSaveRequest();
      case 2:
        return this.getThirdStepSaveRequest();
      case 3:
        return of(true);
    }
  }

  private getFirstStepSaveRequest(): Observable<boolean> {
    if (this.name.invalid || this.firstStepForm.invalid) {
      this.name.markAsTouched();
      this.firstStepForm.markAllAsTouched();
      return of(false);
    }

    if (this.isNotChangedFormValue()) {
      return of(true);
    }

    return this.getLoyaltyWithBasicTierRequest()
      .pipe(
        tap(() => this.prevFormValue = this.form.value), // save current form value for checking changes in next step
        map(response => !!response)
      );
  }

  private getSecondStepSaveRequest(): Observable<boolean> {
    if (this.form.invalid || !this.customTierDataSource || this.customTierDataSource.state === DataSourceStates.firstLoading) {
      this.form.markAllAsTouched();
      return of(false);
    }

    if (this.isNotChangedFormValue()) {
      return of(true);
    }

    return this.getLoyaltyWithBasicTierRequest().pipe(
      tap(() => this.prevFormValue = this.form.value), // save current form value for checking changes in next step
      map(response => !!response)
    );
  }

  private getThirdStepSaveRequest(): Observable<boolean> {
    const ruleSetRequests = this.updateRuleSets();
    if (ruleSetRequests.length === 0) {
      return of(true);
    }
    return combineLatest(ruleSetRequests)
      .pipe(
        defaultIfEmpty({}),
        map(response => !!response)
      );
  }

  private goNext(): void {
    this.stepper.selected.completed = true;   // complete the current step
    // this.stepper._steps.toArray()[this.stepper.selectedIndex + 1].editable = true;
    this.stepper.next();
    // this.stepper.next();                      // move to next step
    // this.stepper.selectionChange.subscribe();
    this.updateStepProgress();
  }

  private updateStepProgress(): void {
    if (this.currentStepIndex > this.stepProgress$.value) {
      this.stepProgress$.next(this.currentStepIndex);
    }
  }

  private setLoading(value: boolean): void {
    this.loading$.next(value);
  }

  private navigateToList(): void {
    this.router.navigate(['/loyalty']);
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

  // loyalty and basic tier
  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
  }

  private getLoyaltyWithBasicTierRequest(): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    const newLoyalty = this.form.value;
    return this.loyaltyService.getLoyaltyRequest(newLoyalty, this.loyaltyId)
      .pipe(
        tap(loyalty => {
          this.loyaltyId = loyalty.id;
          this.form.get('createdAt').patchValue(loyalty.createdAt);
        }),
        switchMap((loyalty) => this.loyaltyService.getBasicTierRequest(newLoyalty, loyalty.id, this.basicTierId)),
        filter(Boolean),
        tap(basicTier => this.setBasicTierId(basicTier.data.id)),
        takeUntil(this.destroy$)
      );
  }

  private setBasicTierId(basicTierId: string): void {
    if (basicTierId && basicTierId !== this.basicTierId) {
      this.basicTierId = basicTierId;
      // this.setBasicTierIdToCustomTiersDataSourceFilter(this.loyaltyId);
    }
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
    this.stepProgress$.next(0);
  }

  private getDefaultValue(): ILoyaltyForm {
    return this.loyaltyFormsService.getDefaultValueForm();
  }

  private isNotChangedFormValue(): boolean {
    return Utils.isEqual(this.form.value, this.prevFormValue);
  }

  // custom tiers
  private initCustomTiersDataSource(): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<ICustomTireForm>(
        this.customTierService,
        20,
        {'filter[program_id]': this.loyaltyId});
    }
  }

  private updateCustomTiersDataSource(): void {
    this.customTierDataSource.updateData();
    // this.customTiersCount.patchValue(this.customTierDataSource.length || 0);
  }

  private getRefDialogSetupTier(data: ICustomTireForm = null): Observable<MatDialogRef<TierSetupPopupComponent>> {
    const dialogRef: MatDialogRef<TierSetupPopupComponent> = this.dialog.open(TierSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        basicTierId: this.basicTierId,
        tier: data,
        config: this.manageConfig
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

  // Rule Sets
  private getBasicTierRuleSet(): Observable<ILoyaltyRuleSet> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::BasicTier', this.basicTierId)
      .pipe(
        tap(ruleSet => this.basicTierRuleSet = ruleSet),
        takeUntil(this.destroy$)
      );
  }

  private getCustomTierRuleSet(id: string): Observable<ILoyaltyRuleSet> {
    return this.ruleService.findAndCreateRuleSet('Perx::Loyalty::CustomTier', id)
      .pipe(
        tap(ruleSet => this.customTierRuleSetMap[id] = ruleSet)
      );
  }

  private getAllCustomTierRuleSet(): Observable<ILoyaltyRuleSet> {
    const customTierIds = this.customTierDataSource.data.map(item => item.id);
    return from(customTierIds).pipe(
      concatMap(id => this.getCustomTierRuleSet(id))
    );
  }

  private initAllRuleSet(): void {
    concat(this.getBasicTierRuleSet(), this.getAllCustomTierRuleSet())
      .pipe(
        tap(() => this.setLoading(true)),
        filter(Boolean),
        tap(() => this.cd.detectChanges()),
        last(),
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
        },
        (error: Error) => console.warn(error.message)
      );
  }

  private createCustomTierRuleSet(id: string): Observable<ILoyaltyRuleSet> {
    this.setLoading(true);
    return this.ruleService.createRuleSet('Perx::Loyalty::CustomTier', id)
      .pipe(
        tap(ruleSet => this.customTierRuleSetMap[id] = ruleSet),
        filter(Boolean),
        finalize(() => this.setLoading(false))
      );
  }

  private updateRuleSetMatchType(data: { ruleSet: ILoyaltyRuleSet, value: string }): void {
    data.ruleSet.matchType = data.value;
  }

  private updateRuleSets(): Observable<IJsonApiItemPayload<IWLoyaltyRuleSetAttributes>>[] {
    const ruleSets = [this.basicTierRuleSet, ...Utils.convertObjToArr(this.customTierRuleSetMap)];
    const ruleSetRequests = [];
    ruleSets.forEach((ruleSet: ILoyaltyRuleSet) => {
      if (ruleSet.rules.length > 1) {
        ruleSetRequests.push(this.ruleService.updateRuleSet(ruleSet));
      }
    });
    return ruleSetRequests;
  }

  // rules
  private getRefDialogSetupRule(data: { ruleSet: ILoyaltyRuleSet, rule?: ILoyaltyRule | null } = null):
    Observable<MatDialogRef<RuleSetupPopupComponent>> {
    const dialogRef: MatDialogRef<RuleSetupPopupComponent> = this.dialog.open(RuleSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        ...data,
        config: this.ruleSetupDialogConfig
      }
    });

    return dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      );
  }

  private createRule(data: { ruleSet: ILoyaltyRuleSet }): void {
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

  private editRule(data: { ruleSet: ILoyaltyRuleSet, rule: ILoyaltyRule }): void {
    this.getRefDialogSetupRule(data)
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((updatedRule) => {
        data.ruleSet.rules = Utils.updateAtArray<ILoyaltyRule>(data.ruleSet.rules, data.rule, updatedRule);
        this.cd.detectChanges();
      });
  }

  private deleteRule(data: { ruleSet: ILoyaltyRuleSet, rule: ILoyaltyRule }): void {
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

  // config
  private initConfigs(): void {
    combineLatest([
      this.configService.getLoyaltyManageConfig(),
      this.configService.getLoyaltySetupRuleConfig(),
      this.configService.getLoyaltyViewConfig()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([manageConfig, setupRuleConfig, viewConfig]) => {
        this.manageConfig = manageConfig;
        this.ruleSetupDialogConfig = setupRuleConfig;
        this.viewConfig = viewConfig;
      });
    {

    }
  }
}
