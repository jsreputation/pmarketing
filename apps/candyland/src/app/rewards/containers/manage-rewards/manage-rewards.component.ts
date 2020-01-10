import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, tap, takeUntil, distinctUntilChanged, debounceTime, catchError, mergeMap } from 'rxjs/operators';
import { RewardsService, MerchantsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { CreateMerchantPopupComponent, SelectMerchantPopupComponent, ToggleControlService } from '@cl-shared';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ICustomTireForm, ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';
import { IWTierRewardCostsAttributes, IJsonApiItem } from '@perx/whistler';
import { oc } from 'ts-optchain';

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
  public selectedMerchant: Merchant | null;
  public loyalties: ILoyaltyForm[];
  public rewardLoyaltyForm: FormArray;
  public getRewardLoyaltyData$: BehaviorSubject<ILoyaltyFormGroup[] | null> = new BehaviorSubject<ILoyaltyFormGroup[] | null>(null);

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
    private translateDefaultLanguage: TranslateDefaultLanguageService
  ) { }

  public ngOnInit(): void {
    this.initConfig();
    this.initForm();
    this.handleFormValueChanges();
    this.handleMerchantIdChanges();
    this.handleRouteParams();
    this.setTranslateLanguage();
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
    if (this.form.invalid || this.rewardLoyaltyForm.invalid) {
      this.form.markAllAsTouched();
      this.rewardLoyaltyForm.markAllAsTouched();
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
    let id: string;
    request
      .pipe(
        switchMap(res => {
          if (this.id) {
            return this.updateRewardTiers(this.rewardLoyaltyForm.value);
          }

          if (res && res.data.id) {
            id = res.data.id;
            return this.createRewardTiers(this.rewardLoyaltyForm.value, id);
          }
        })
      )
      .subscribe(
        () => {
          if (id || this.id) {
            this.router.navigateByUrl(`/rewards/detail/${id ? id : this.id}`);
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
      .subscribe((merchant: Merchant | null) => {
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
      }),
      switchMap((id: string) => id ? this.rewardsService.getRewardToForm(id) : of(null)),
      takeUntil(this.destroy$),
    )
      .subscribe(
        (reward: IRewardEntityForm | undefined) => {
          // handle the loyalties to patch form
          if (!reward) {
            return;
          }
          this.getRewardLoyaltyData$.next(reward ? reward.loyalties : null);

          this.reward = reward;
          const patchData = reward || this.newRewardFormService.getDefaultValue();
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
      result.push(this.rewardsService.createRewardTier(item.basicTier, id));

      item.tiers.forEach((tier: ILoyaltyTiersFormGroup) => {
        if (tier.statusTiers) {
          result.push(this.rewardsService.createRewardTier(tier, id));
        }
      });
    });

    return forkJoin(result);
  }

  private updateRewardTiers(rewardLoyaltyForm: ILoyaltyFormGroup[]): Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>[]> {
    rewardLoyaltyForm.forEach((item) => {
      // this need for update basicTier
      this.handlerTierUpdate(item.basicTier);
      item.tiers.forEach((tier) => {
        // this need for update customTier
        this.handlerTierUpdate(tier);
      });
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
      if ('' + this.id === '' + rewardTier.rewardId) {
        result[rewardTier.tierId] = rewardTier;
      }
    });
    return result;
  }

  private handlerTierCost(loyalties: { data: ILoyaltyForm[] }, rewardTierMap: { [key: string]: ITierRewardCost }): void {
    this.rewardLoyaltyForm = this.newRewardFormService.getRewardLoyaltyForm();
    loyalties.data.forEach((loyalty: ILoyaltyForm) => {
      const loyaltyFormGroup = this.newRewardFormService.getLoyaltyFormGroup();

      const basicTier = rewardTierMap[loyalty.basicTierId];
      // handler of custom tears
      this.setCustomTiers(loyalty, loyaltyFormGroup);

      if (basicTier) {
        this.newRewardFormService.setDefaultRewardTiers(basicTier);

        loyaltyFormGroup.patchValue({
          programId: loyalty.id,
          basicTier: {
            ...basicTier,
            tierId: loyalty.basicTierId,
            entityId: this.id,
          }
        });
      }
      loyaltyFormGroup.patchValue({
        programId: loyalty.id,
        basicTier: {
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

  private patchWithSavedLoyalties(rewardTierMap: { [key: string]: ITierRewardCost }, form: FormArray): void {
    for (let index = 0; index < form.controls.length - 1; index++) {
      const loyaltyGroup: AbstractControl = form.at(index);
      if (rewardTierMap) {
        (loyaltyGroup.get('tiers') as FormArray).controls.forEach((tier) => {
          const rewardTier = rewardTierMap[tier.value.tierId];
          if (rewardTier && rewardTier.tierType === 'Perx::Loyalty::CustomTier') {
            // add to object for know what to do next remove or update

            rewardTier['statusTiers'] = true;
            this.newRewardFormService.setDefaultRewardTiers(rewardTier);
            tier.patchValue({ ...rewardTier });
          }
        });
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
}
