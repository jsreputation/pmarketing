import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
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
import { IWTierRewardCostsAttributes } from '@perx/whistler';

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
  public selectedMerchant: Merchant;
  public loyalties: ILoyaltyForm[];
  public rewardLoyaltyForm: FormArray;
  public getRewardLoyaltyData$: BehaviorSubject<ILoyaltyFormGroup[] | null> = new BehaviorSubject<ILoyaltyFormGroup[] | null>(null);
  public defaultRewardTiers: any = {};
  public tierDelete: any = [];
  public tierUpdate: any = [];

  public get merchantId(): AbstractControl {
    return this.form.get('rewardInfo.merchantId');
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
  ) {
  }

  public ngOnInit(): void {
    this.initConfig();
    this.initForm();
    this.handleFormValueChanges();
    this.handleMerchantIdChanges();
    this.handleRouteParams();
    this.setTranslateLanguage();
    this.patchLoyaltiesForm();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.id) {
      return this.updateRewardTiers(this.rewardLoyaltyForm.value);
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
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((merchant: any) => this.merchantsService.createMerchant(merchant)),
        filter(Boolean),
        takeUntil(this.destroy$),
      )
      .subscribe((id) => {
        this.merchantId.patchValue(id);
      });
  }

  public openDialogSelectMerchant(): void {
    const dialogRef = this.dialog.open(SelectMerchantPopupComponent);

    dialogRef.afterClosed().subscribe((merchant) => {
      if (merchant) {
        this.merchantId.patchValue(merchant.id);
      }
    });
  }

  public deleteMerchant(): void {
    this.merchantId.patchValue(null);
    this.selectedMerchant = null;
  }

  private initConfig(): void {
    this.rewardsService.getRewardsOptions()
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
        switchMap((id: string) => this.merchantsService.getMerchant(id)),
        takeUntil(this.destroy$),
      )
      .subscribe((merchant) => {
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
      tap((id: any) => this.id = id),
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

  private getRewardTierList(): Observable<ITierRewardCost[]> {
    return this.rewardsService.getRewardTierList();
  }

  private createRewardTiers(rewardLoyaltyForm: ILoyaltyFormGroup[], id: string)
    : Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>[]> {
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

  private updateRewardTiers(rewardLoyaltyForm: ILoyaltyFormGroup[])
    : Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>[]> {
    const result: Observable<IJsonApiItem<Partial<IWTierRewardCostsAttributes>>>[] = [];
    rewardLoyaltyForm.forEach((item) => {
      // item это нужно для обновления базового тира!!!!!!

      this.handlerTierUpdate(item.basicTier);
      // result.push(this.rewardsService.patchRewardTier(item.basicTier, this.id));

      item.tiers.forEach((tier) => {

        // console.log('tier', tier);
        // console.log('this.default', this.defaultRewardTiers);

        this.handlerTierUpdate(tier);
        // result.push(this.rewardsService.patchRewardTier(tier, this.id));
      });
    });

    console.log('this.tierUpdate', this.tierUpdate);
    console.log('this.tierDelete', this.tierDelete);

    return forkJoin(result);
  }

  private patchLoyaltiesForm(): void {
    combineLatest([this.getLoyalties(), this.getRewardTierList()])
      .subscribe(([loyalties, rewardTierList]) => {
        console.log('rewardTierList', rewardTierList);
        const rewardTierMap = this.filterRewardTierList(rewardTierList);
        this.handlerTierCost(loyalties, rewardTierMap);
      });
  }

  private filterRewardTierList(rewardTierList: ITierRewardCost[]): {[key: string]: ITierRewardCost} {
    const result: {[key: string]: ITierRewardCost} = {};
    rewardTierList.forEach((rewardTier) => {
      if ('' + this.id === '' + rewardTier.rewardId) {
        result[rewardTier.tierId] = rewardTier;
      }
    });
    return result;
  }

  private handlerTierCost(loyalties: { data: ILoyaltyForm[] }, rewardTierMap: {[key: string]: ITierRewardCost}): void {
    this.rewardLoyaltyForm = this.newRewardFormService.getRewardLoyaltyForm();
    loyalties.data.forEach((loyalty: ILoyaltyForm) => {
      const loyaltyFormGroup = this.newRewardFormService.getLoyaltyFormGroup();

      // console.log('loyalty for set', loyalty);
      // console.log('rewardTierMap', rewardTierMap);

      const basicTier = rewardTierMap[loyalty.basicTierId];
      // if (loyalty.name === 'vbnvbnghfgh') {
      //   console.log('loyalty for set', loyalty);
      //   console.log('basicTier for patch', basicTier);
      //   debugger;
      //   alert('asdaf;sdf');
      // }

      // debugger;
      // handler of custom tears
      this.setCustomTiers(loyalty, loyaltyFormGroup);
      // patch basic tier нужно )))

      if (basicTier) {
        this.defaultRewardTiers[basicTier.tierId] = basicTier;

        // console.log('basicTier for patch', basicTier);

        loyaltyFormGroup.patchValue({
          programId: loyalty.id,
          basicTier: {
            ...basicTier,
            tierId: loyalty.basicTierId,
            entityId: this.id,
          }
        });
        // console.log('loyaltyFormGroup.value', loyaltyFormGroup.value);
        // debugger;
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

  private patchWithSavedLoyalties(rewardTierMap: {[key: string]: ITierRewardCost}, form: FormArray): void {
    for (let index = 0; index < form.controls.length - 1; index++) {
      const loyaltyGroup: AbstractControl = form.at(index);
      if (rewardTierMap) {
        (loyaltyGroup.get('tiers') as FormArray).controls.forEach((tier) => {
          const rewardTier = rewardTierMap[tier.value.tierId];
          if (rewardTier) {
            // пушу для дальнейшей проверки сохранять или удалить.
            rewardTier['statusTiers'] = true;
            this.defaultRewardTiers[rewardTier.tierId] = rewardTier;
            tier.patchValue({...rewardTier});
          }
        });
      }
    }
  }

  private handlerTierUpdate(tier: any): void {
    const tempTier = this.defaultRewardTiers[tier.tierId];

    // remove custom tier
    if (tempTier && !tier.statusTiers && tier.tierType === 'Perx::Loyalty::CustomTier') {
      // на удаление тира
      return this.tierDelete.push(tier);
    }

    // update custom tier
    if (tempTier && tier.tierType === 'Perx::Loyalty::CustomTier' &&
      (tier.tierValue !== tempTier.tierValue || tier.statusDiscount !== tempTier.statusDiscount)
    ) {
      return this.tierUpdate.push(tier);
    }

    // update basic tier
    if (
      tempTier && tempTier.tierValue !== tier.tierValue
      && tempTier.tierType === 'Perx::Loyalty::BasicTier'
    ) {
      console.log('tempTier.tierValue, tier.tierValue', tempTier.tierValue, tier.tierValue);
      this.tierUpdate.push(tier);
    }
  }
}
