import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { NewRewardFormService } from 'src/app/rewards/services/new-reward-form.service';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';
import { SelectMerchantComponent } from '@cl-shared/containers/select-merchant/select-merchant.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { RewardsService, MerchantsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'cl-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss']
})
export class ManageRewardsComponent implements OnInit, OnDestroy {
  public id: string;
  public reward: any;
  public form: FormGroup;
  public config: OptionConfig[];
  public selectedMerchant;
  public selectedMerchantTab: 'select' | 'create' | null;

  constructor(public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private rewardsService: RewardsService,
              private merchantsService: MerchantsService,
              private newRewardFormService: NewRewardFormService,
              private toggleControlService: ToggleControlService) {
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
  }

  public ngOnDestroy(): void {
    this.cd.detach();
  }

  public cancel(): void {
    this.router.navigateByUrl('/rewards');
  }

  public save(): void {
    if (this.form.valid) {
      let request: Observable<any>;
      if (this.id) {
        request = this.rewardsService.updateReward(this.id, this.form.value);
      } else {
        request = this.rewardsService.createReward(this.form.value);
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
  }

  public openDialogCreateMerchant(): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        switchMap(merchant => this.merchantsService.createMerchant(merchant)),
        filter(Boolean),
      )
      .subscribe((id) => {
        this.form.get('merchantInfo').patchValue(id);
        this.selectedMerchantTab = 'create';
      });
  }

  public openDialogSelectMerchant(): void {
    const dialogRef = this.dialog.open(SelectMerchantComponent);

    dialogRef.afterClosed().subscribe((merchant) => {
      if (merchant) {
        this.form.get('merchantInfo').patchValue(merchant.id);
        this.selectedMerchantTab = 'select';
      }
    });
  }

  public deleteMerchant(): void {
    this.form.get('merchantInfo').patchValue(null);
    this.selectedMerchant = null;
    this.selectedMerchantTab = null;
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
      switchMap((id: string) => this.rewardsService.getReward(id))
    )
      .subscribe(
        reward => {
          this.reward = reward;
          console.log(this.reward);
          this.form.patchValue(reward);
        },
        () => this.router.navigateByUrl('/rewards')
      );
  }

  private updateId(id): void {
    if (id) {
      this.id = id;
    } else {
      this.id = null;
      this.form.patchValue(this.newRewardFormService.getDefaultValue());
    }
  }
}
