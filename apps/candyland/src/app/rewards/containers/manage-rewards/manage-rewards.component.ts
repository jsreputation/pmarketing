import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';

import { RewardsService, MerchantsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { CreateMerchantPopupComponent, SelectMerchantPopupComponent, ToggleControlService } from '@cl-shared';
import { Merchant } from '@cl-core/http-adapters/merchant';

@Component({
  selector: 'cl-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss']
})
export class ManageRewardsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public id: string;
  public reward: IRewardEntityForm;
  public form: FormGroup;
  public config: OptionConfig[];
  public selectedMerchant: Merchant;

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
    private toggleControlService: ToggleControlService
  ) {
  }

  public ngOnInit(): void {
    this.initConfig();
    this.initForm();
    this.handleFormValueChanges();
    this.handleMerchantIdChanges();
    this.handleRouteParams();
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
      request = this.rewardsService.updateReward(this.id, rewardEntityForm);
    } else {
      request = this.rewardsService.createReward(rewardEntityForm);
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
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((merchant: any) => this.merchantsService.createMerchant(merchant)),
        filter(Boolean)
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
        takeUntil(this.destroy$),
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

  private handleMerchantIdChanges(): void {
    this.merchantId.valueChanges
      .pipe(
        takeUntil(this.destroy$),
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
      takeUntil(this.destroy$),
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap((id: string) => {
        if (id) {
          return this.rewardsService.getRewardToForm(id);
        }
        return of(null);
      })
    )
      .subscribe(
        (reward: IRewardEntityForm) => {
          this.reward = reward;
          const patchData = reward || this.newRewardFormService.getDefaultValue();
          this.form.patchValue(patchData);
        },
        () => this.router.navigateByUrl('/rewards')
      );
  }
}
