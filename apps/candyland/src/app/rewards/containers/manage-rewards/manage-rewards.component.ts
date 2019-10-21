import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RewardsService, MerchantsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { CreateMerchantPopupComponent, SelectMerchantPopupComponent, ToggleControlService } from '@cl-shared';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { LoyaltyService } from '@cl-core/services/loyalty.service';

@Component({
  selector: 'cl-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss']
})
export class ManageRewardsComponent implements OnInit, OnDestroy {
  public id: string;
  public reward: IRewardEntityForm;
  public form: FormGroup;
  public config: OptionConfig[];
  public selectedMerchant: Merchant;
  public loyalties: any;
  public rewardLoyaltyForm: FormArray;
  public getRewardLoyaltyData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

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
  ) {
  }

  public ngOnInit(): void {
    this.initConfig();
    this.initForm();
    this.handleFormValueChanges();
    this.handleMerchantControleChanges();
    if (!this.id) {
      this.form.patchValue(this.newRewardFormService.getDefaultValue());
    }
    this.handleRouteParams();
    this.getLoyalties();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
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
    const form: IRewardEntityForm = this.form.value;
    form.rewardInfo.organizationId = this.selectedMerchant && this.selectedMerchant !== null ? this.selectedMerchant.id : null;
    if (this.id) {
      request = this.rewardsService.updateReward(this.id, form, this.rewardLoyaltyForm.value);
    } else {
      request = this.rewardsService.createReward(form, this.rewardLoyaltyForm.value);
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
        untilDestroyed(this),
        filter(Boolean),
        switchMap((merchant: any) => this.merchantsService.createMerchant(merchant)),
        filter(Boolean),
      )
      .subscribe((id) => {
        this.form.get('merchantInfo').patchValue(id);
      });
  }

  public openDialogSelectMerchant(): void {
    const dialogRef = this.dialog.open(SelectMerchantPopupComponent);

    dialogRef.afterClosed().subscribe((merchant) => {
      if (merchant) {
        this.form.get('merchantInfo').patchValue(merchant.id);
      }
    });
  }

  public deleteMerchant(): void {
    this.form.get('merchantInfo').patchValue(null);
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
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(() => {
        const toggleConfig = this.newRewardFormService.getToggleConfig(this.form);
        this.toggleControlService.updateFormStructure(toggleConfig);
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });
  }

  private handleMerchantControleChanges(): void {
    this.form.get('merchantInfo').valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500),
        filter(Boolean),
        switchMap((id: string) => this.merchantsService.getMerchant(id))
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
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      tap((id) => this.updateId(id)),
      filter(Boolean),
      switchMap((id: any) => this.rewardsService.getRewardToForm(id))
    )
      .subscribe(
        (reward: IRewardEntityForm) => {
          // TODO: need handle the loyalties to patch form
          if (reward.loyalties) {
            this.getRewardLoyaltyData$.next(reward.loyalties);
          }
          console.log('reward', reward);
          this.reward = reward;
          this.form.patchValue(reward);
          this.form.get('merchantInfo').patchValue(reward.rewardInfo.organizationId);
        },
        () => this.router.navigateByUrl('/rewards')
      );
  }

  private updateId(id: string): void {
    if (id) {
      this.id = id;
    } else {
      this.id = null;
      this.form.patchValue(this.newRewardFormService.getDefaultValue());
    }
  }

  private getLoyalties(): void {
    const params: any = {
      'page[number]': 1,
      'page[size]': 20
    };
    this.loyaltyService.getLoyalties(params)
      .subscribe(((loyalties) => {
        console.log('data in the component', loyalties);

        this.rewardLoyaltyForm = this.newRewardFormService.getRewardLoyaltyForm();
        loyalties.data.forEach((loyalty) => {
          const loyaltyFormGroup = this.newRewardFormService.getLoyaltyFormGroup();
          console.log(loyalty);

          // handler of custom tears
          this.setCustomTiers(loyalty, loyaltyFormGroup);

          loyaltyFormGroup.patchValue({
            programId: loyalty.id,
          });

          this.rewardLoyaltyForm.push(loyaltyFormGroup);
        });

        console.log('form value', this.rewardLoyaltyForm.value);

        this.loyalties = loyalties.data;
        this.cd.detectChanges();
      }));
  }

  private setCustomTiers(loyalty: any, loyaltyFormGroup: FormGroup): void {
    // handler of custom tears
    if (loyalty.customTiers) {
      loyalty.customTiers.forEach((item: any) => {
        const loyaltyTiersGroup =
          this.newRewardFormService.getRewardLoyaltyTiersGroup();
        loyaltyTiersGroup.patchValue({
          name: item.name,
        });
        (loyaltyFormGroup.get('tiers') as FormArray)
          .push(loyaltyTiersGroup);
      });
    }
  }
}
