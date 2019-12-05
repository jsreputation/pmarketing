import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { RewardsService, MerchantsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { CreateMerchantPopupComponent, SelectMerchantPopupComponent, ToggleControlService } from '@cl-shared';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';

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
  public loyalties: any;
  public rewardLoyaltyForm: FormArray;
  public getRewardLoyaltyData$: BehaviorSubject<ILoyaltyFormGroup[] | null> = new BehaviorSubject<ILoyaltyFormGroup[] | null>(null);

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
    this.handlerLoyalty();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
    request.subscribe(
      res => {
        if (res && res.data.id) {
          this.router.navigateByUrl('/rewards/detail/' + res.data.id);
        }
      },
      error => console.warn('error', error)
    );

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
      tap(id => this.id = id),
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

  private handlerLoyalty(): void {
    combineLatest([this.getLoyalties(), this.getRewardLoyaltyData$])
      .subscribe((([loyalties, savedLoyalty]) => {
        let saveLoyaltiesMap: IMapLoyalties;

        // if exist saved loyalties cleans it
        if (savedLoyalty && savedLoyalty.length) {
          const poolExistingIdLoyalties = this.setPoolIdExistingLoyalty(loyalties.data);
          const cleanSavedLoyalties: ILoyaltyFormGroup[] = this.filterSavedLoyalties(savedLoyalty, poolExistingIdLoyalties);
          saveLoyaltiesMap = this.createMapSaveLoyalties(cleanSavedLoyalties);
        }

        this.rewardLoyaltyForm = this.newRewardFormService.getRewardLoyaltyForm();
        loyalties.data.forEach((loyalty: ILoyaltyForm) => {
          const loyaltyFormGroup = this.newRewardFormService.getLoyaltyFormGroup();

          // handler of custom tears
          this.setCustomTiers(loyalty, loyaltyFormGroup);

          loyaltyFormGroup.patchValue({
            programId: loyalty.id,
          });

          this.rewardLoyaltyForm.push(loyaltyFormGroup);
        });
        // patch with if exist savedLoyalties
        if (savedLoyalty && savedLoyalty.length) {
          this.patchWithSavedLoyalties(saveLoyaltiesMap, this.rewardLoyaltyForm);
        }

        this.loyalties = loyalties.data;
        this.cd.detectChanges();
      }));
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
      loyalty.customTiers.forEach((item: any) => {
        const loyaltyTiersGroup =
          this.newRewardFormService.getRewardLoyaltyTiersGroup();
        loyaltyTiersGroup.patchValue({
          name: item.name,
          customTierId: item.id
        });
        (loyaltyFormGroup.get('tiers') as FormArray)
          .push(loyaltyTiersGroup);
      });
    }
  }

  private setPoolIdExistingLoyalty(data: any): string[] {
    return data.map((item: any) => item.id);
  }

  private filterSavedLoyalties(savedLoyalties: ILoyaltyFormGroup[], poolLoyaltiesId: string[]): ILoyaltyFormGroup[] {
    return savedLoyalties.filter((loyalty) => poolLoyaltiesId.includes(loyalty.programId));
  }

  private patchWithSavedLoyalties(savedLoyalties: IMapLoyalties, form: FormArray): void {
    for (let index = 0; index < form.controls.length - 1; index++) {
      const loyaltyGroup = form.at(index);
      if (savedLoyalties[loyaltyGroup.value.programId]) {
        const currentSavedLoyalty: IMapLoyalty = savedLoyalties[loyaltyGroup.value.programId];
        loyaltyGroup.patchValue({
          costReward: currentSavedLoyalty.costReward,
        });
        // clean custom tear and patch value
        loyaltyGroup.value.tiers.forEach((tier, indexTier: number) => {
          if (savedLoyalties[loyaltyGroup.value.programId].tiers[tier.customTierId]) {
            const savedTier: ILoyaltyTiersFormGroup = savedLoyalties[loyaltyGroup.value.programId].tiers[tier.customTierId];
            // get control tiers and patch it
            const controlTier = (loyaltyGroup.get('tiers') as FormArray).at(indexTier);
            controlTier.patchValue({
              statusDiscount: savedTier.statusDiscount,
              statusTiers: savedTier.statusTiers
            });
          }
        });
      }
    }
  }

  private createMapSaveLoyalties(saveLoyalties: ILoyaltyFormGroup[]): IMapLoyalties {
    const result = {};
    saveLoyalties.forEach((loyalty: ILoyaltyFormGroup) => {
      const tiersMap = {};
      loyalty.tiers.forEach((tier) => tiersMap[tier.customTierId] = tier);
      result[loyalty.programId] = {
        ...loyalty,
        tiers: tiersMap
      };
    });
    return result;
  }

  private setTranslateLanguage(): void {
    this.translateDefaultLanguage.defaultLanguage$
      .subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      });
  }
}
