import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, tap, takeUntil, distinctUntilChanged, debounceTime, catchError, mergeMap } from 'rxjs/operators';
import { RewardsService, MerchantsService, TenantStoreService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { CreateMerchantPopupComponent, SelectMerchantPopupComponent, ToggleControlService } from '@cl-shared';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';
import { IWTierRewardCostsAttributes, IJsonApiItem } from '@perx/whistler';
import { oc } from 'ts-optchain';
import { TenantService } from '@cl-core/services/tenant.service';

@Component({
  selector: 'cl-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss']
})
export class ManageRewardsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public id: string;
  public reward: IRewardEntityForm;
  public form: FormGroup;
  public config: OptionConfig[];
  public selectedMerchant: IMerchantForm | null;
  public loyalties: ILoyaltyForm[];
  public rewardLoyaltyForm: FormArray;
  public getRewardLoyaltyData$: BehaviorSubject<ILoyaltyFormGroup[] | null> = new BehaviorSubject<ILoyaltyFormGroup[] | null>(null);
  public currency$: Observable<Currency[]>;
  private tierForSent: any = {
    update: [],
    delete: [],
    create: []
  };

  private get merchantId(): FormControl {
    return this.form.get('rewardInfo.merchantId') as FormControl;
  }

  constructor(
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private merchantsService: MerchantsService,
    private newRewardFormService: NewRewardFormService,
    private toggleControlService: ToggleControlService,
    private loyaltyService: LoyaltyService,
    private readonly translate: TranslateService,
    private translateDefaultLanguage: TranslateDefaultLanguageService,
    private tenantStoreService: TenantStoreService,
    private tenantService: TenantService
  ) { }

  public ngOnInit(): void {
    this.initConfig();
    this.initForm();
    this.handleFormValueChanges();
    this.handleMerchantIdChanges();
    this.handleRouteParams();
    this.setTranslateLanguage();
    this.getTenantCurrency();
    this.getCurrency();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public cancel(): void {
    this.router.navigateByUrl('/rewards');
  }

  public save(): void {
    if (this.form && this.form.invalid) {
      this.form.markAllAsTouched();
    }
    if (this.rewardLoyaltyForm && this.rewardLoyaltyForm.invalid) {
      this.rewardLoyaltyForm.markAllAsTouched();
    }
    if (!(this.form && this.form.valid && this.rewardLoyaltyForm && this.rewardLoyaltyForm.valid)) {
      return;
    }

    let request: Observable<any>;
    const rewardEntityForm: IRewardEntityForm = this.form.value;

    if (this.id) {
      rewardEntityForm.displayProperties = this.reward.displayProperties;
      request = this.rewardsService.updateReward(this.id, rewardEntityForm, this.rewardLoyaltyForm.value);
    } else {
      request = this.rewardsService.createReward(rewardEntityForm, this.rewardLoyaltyForm.value);
    }

    this.subscribeToSaveRequest(request);
  }

  public subscribeToSaveRequest(request: Observable<any>): void {
    request
      .pipe(
        switchMap(res => {
          if (this.id) {
            return this.updateRewardTiers(this.rewardLoyaltyForm.value);
          }

          if (res && res.data.id) {
            this.id = res.data.id;
            return this.createRewardTiers(this.rewardLoyaltyForm.value, this.id);
          }
        })
      )
      .subscribe(
        () => {
          if (this.id) {
            this.router.navigateByUrl(`/rewards/detail/${this.id}`);
          }
        },
        error => console.warn('error', error));
  }

  public openDialogCreateMerchant(): void {
    this.dialog.open(CreateMerchantPopupComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((merchant: any) => this.merchantsService.createMerchant(merchant)),
        filter(Boolean),
        takeUntil(this.destroy$),
      )
      .subscribe((id) => this.merchantId.setValue(id));
  }

  public openDialogSelectMerchant(): void {
    this.dialog.open<SelectMerchantPopupComponent, void, IMerchant>(SelectMerchantPopupComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((merchant: IMerchant) => this.merchantId.setValue(Number.parseInt(merchant.id, 10)));
  }

  public deleteMerchant(): void {
    this.merchantId.setValue(null);
    this.selectedMerchant = null;
  }

  private initConfig(): void {
    this.rewardsService.getreward()
      .subscribe((config: OptionConfig[]) => this.config = config);
  }

  private initForm(): void {
    this.form = this.newRewardFormService.getForm();
  }

  private handleFormValueChanges(): void {
    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const toggleConfig = this.newRewardFormService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });
  }

  private handleMerchantIdChanges(): void {
    this.merchantId.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        filter(Boolean),
        tap(() => this.selectedMerchant = null),
        // use mergeMap to make sure, we do not subscribing to valueChanges after one call
        mergeMap(
          (id: string) => this.merchantsService.getMerchant(id)
            // catchError is done here, to make sure that 404 errors do not stop subscribing to valueChanges on errors
            .pipe(catchError(err => (oc(err).errors[0].code() === '404') ? of(null) : throwError(err)))
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((merchant: IMerchantForm | null) => {
        this.selectedMerchant = merchant;
        this.updateForm();
      });
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap((id: any) => {
        this.id = id;
        this.patchLoyaltiesForm(this.id);
        if (!id) {
          this.setDefaultCurrencyToRewardForm();
        }
      }),
      switchMap((id: string) => id
        ? combineLatest(...[this.rewardsService.getRewardToForm(id), this.getTenantCurrency()])
        : of([null, this.getTenantCurrency()])),
      takeUntil(this.destroy$),
    )
      .subscribe(
        ([reward, currency]) => {
          // handle the loyalties to patch form
          if (!reward) {
            return;
          }
          this.setDefaultCurrencyExistReward(reward, currency);
          this.getRewardLoyaltyData$.next(reward ? reward.loyalties : null);
          this.reward = reward;
          const patchData = reward || this.newRewardFormService.getDefaultValue(currency);
          this.form.patchValue(patchData);
        },
        () => this.router.navigateByUrl('/rewards')
      );
  }

  private getLoyalties(): Observable<{ data: ILoyaltyForm[] }> {
    const params: any = {
      'page[number]': 1,
      'page[size]': 20
    };
    return this.loyaltyService.getLoyalties(params);
  }

  private setCustomTiers(loyalty: ILoyaltyForm, loyaltyFormGroup: FormGroup): void {
    // handler of custom tears
    if (loyalty.customTiers) {
      loyalty.customTiers.forEach((item: ICustomTireForm) => {
        const loyaltyTiersGroup =
          this.newRewardFormService.getRewardLoyaltyTiersGroup();
        loyaltyTiersGroup.patchValue({
          name: item.name,
          tierId: item.id
        });
        (loyaltyFormGroup.get('tiers') as FormArray)
          .push(loyaltyTiersGroup);
      });
    }
  }

  private setTranslateLanguage(): void {
    this.translateDefaultLanguage.defaultLanguage$
      .subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      });
  }

  private getRewardTierList(id: string): Observable<ITierRewardCost[]> {
    return this.rewardsService.getRewardTierList(id);
  }

  private createRewardTiers(
    rewardLoyaltyForm: ILoyaltyFormGroup[],
    id: string
  ): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>[]> {
    const result: Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>[] = [];
    rewardLoyaltyForm.forEach((item: ILoyaltyFormGroup) => {
      if (!item.basicTier.tierId) {
        return;
      }

      if (item.basicTier.statusTiers) {
        result.push(this.rewardsService.createRewardTier(item.basicTier, id));
      }

      item.tiers.forEach((tier: ILoyaltyTiersFormGroup) => {
        if (tier.statusTiers) {
          result.push(this.rewardsService.createRewardTier(tier, id));
        }
      });
    });

    return result.length ? forkJoin(result) : of(void 0);
  }

  private updateRewardTiers(rewardLoyaltyForm: ILoyaltyFormGroup[]): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>[]> {
    rewardLoyaltyForm.forEach((item) => {
      // this need for update basicTier
      this.handlerTierUpdate(item.basicTier);
      // this need for update customTier
      item.tiers.forEach((tier) => this.handlerTierUpdate(tier));
    });
    const result: Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>[] = this.sendTiers();

    return result.length ? forkJoin(result) : of(null);
  }

  private patchLoyaltiesForm(id: string): void {
    combineLatest([this.getLoyalties(), this.getRewardTierList(id)])
      .subscribe(([loyalties, rewardTierList]) => {
        const rewardTierMap = this.filterRewardTierList(rewardTierList);
        this.handlerTierCost(loyalties, rewardTierMap);
      });
  }

  private filterRewardTierList(rewardTierList: ITierRewardCost[]): { [key: string]: ITierRewardCost } {
    const result: { [key: string]: ITierRewardCost } = {};
    rewardTierList.forEach((rewardTier) => {
      if (`${this.id}` === `${rewardTier.rewardId}`) {
        const prefix = rewardTier.tierType === this.newRewardFormService.tierTypes.basicType ? 'basic' : 'custom';
        result[prefix + rewardTier.tierId] = rewardTier;
      }
    });
    return result;
  }

  private handlerTierCost(loyalties: { data: ILoyaltyForm[] }, rewardTierMap: { [key: string]: ITierRewardCost }): void {
    this.rewardLoyaltyForm = this.newRewardFormService.getRewardLoyaltyForm();
    loyalties.data.forEach((loyalty: ILoyaltyForm) => {
      const loyaltyFormGroup = this.newRewardFormService.getLoyaltyFormGroup();
      let programStatus;
      const basicTier = rewardTierMap[`basic${loyalty.basicTierId}`];
      // handler of custom tears
      this.setCustomTiers(loyalty, loyaltyFormGroup);

      if (basicTier && basicTier.tierType === this.newRewardFormService.tierTypes.basicType) {
        programStatus = true;
        basicTier['statusTiers'] = true;
        this.newRewardFormService.setDefaultRewardTiers(basicTier);
      }
      loyaltyFormGroup.patchValue({
        programId: loyalty.id,
        programStatus,
        basicTier: {
          ...(basicTier || {}),
          tierId: loyalty.basicTierId,
          entityId: this.id,
        }
      });
      this.rewardLoyaltyForm.push(loyaltyFormGroup);
    });
    // patch with if exist savedLoyalties
    if (rewardTierMap) {
      this.patchWithSavedLoyalties(rewardTierMap, this.rewardLoyaltyForm);
    }
    this.loyalties = loyalties.data;
    this.cd.detectChanges();
  }

  private patchWithSavedLoyalties(rewardTierMap: { [key: string]: ITierRewardCost }, rewardLoyaltyForm: FormArray): void {
    for (let index = 0; index < rewardLoyaltyForm.controls.length; index++) {
      const loyaltyGroup: AbstractControl = rewardLoyaltyForm.at(index);
      if (rewardTierMap) {
        let hasSelectedCustomTier = false;
        (loyaltyGroup.get('tiers') as FormArray).controls.forEach((tier) => {
          const rewardTier = rewardTierMap[`custom${tier.value.tierId}`];
          if (rewardTier && rewardTier.tierType === this.newRewardFormService.tierTypes.customType) {
            // add to object for know what to do next remove or update
            hasSelectedCustomTier = true;
            rewardTier['statusTiers'] = true;
            this.newRewardFormService.setDefaultRewardTiers(rewardTier);
            tier.patchValue({ ...rewardTier });
          }
        });
        if (hasSelectedCustomTier) {
          loyaltyGroup.get('programStatus').patchValue(true);
        }
      }
    }
  }

  private handlerTierUpdate(tier: ILoyaltyTiersFormGroup | IBasicTier): void {
    this.newRewardFormService.handlerTierUpdate(tier, this.tierForSent);
  }

  private sendTiers(): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>[] {
    const result = [];
    this.tierForSent.update.forEach(tier => {
      if (!tier.tierId) {
        return;
      }
      result.push(this.rewardsService.patchRewardTier(tier, this.id));
    });
    this.tierForSent.delete.forEach(tier => {
      if (!tier.tierId) {
        return;
      }
      result.push(this.rewardsService.deleteRewardTier(tier));
    });
    this.tierForSent.create.forEach(tier => {
      result.push(this.rewardsService.createRewardTier(tier, this.id));
    });

    return result;
  }

  private getTenantCurrency(): Observable<string> {
    return this.tenantStoreService.currency$
      .pipe(
        takeUntil(this.destroy$)
      );
  }

  private getCurrency(): void {
    this.currency$ = this.tenantService.getCurrency();
  }

  private setDefaultCurrencyToRewardForm(): void {
    this.getTenantCurrency()
      .subscribe((currency) => {
        const patchData = this.newRewardFormService.getDefaultValue(currency);
        this.form.patchValue(patchData);
      });
  }

  private setDefaultCurrencyExistReward(reward: IRewardEntityForm, currency: string): void {
    reward.rewardInfo.currency = reward.rewardInfo.currency ? reward.rewardInfo.currency : currency;
  }
}
