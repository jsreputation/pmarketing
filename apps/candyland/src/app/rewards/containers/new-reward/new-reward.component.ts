import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { MatDialog } from '@angular/material';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';
import { SelectMerchantComponent } from '@cl-shared/containers/select-merchant/select-merchant.component';
import { NewRewardFormService } from 'src/app/rewards/services/new-reward-form.service';
import { RewardService } from '@cl-core/http-services/reward.service';

@Component({
  selector: 'cl-new-reward',
  templateUrl: './new-reward.component.html',
  styleUrls: ['./new-reward.component.scss']
})
export class NewRewardComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public config: OptionConfig[];

  constructor(public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private rewardService: RewardService,
              private newRewardFormService: NewRewardFormService,
              private toggleControlService: ToggleControlService) {
  }

  public ngOnInit(): void {
    this.rewardService.getRewardsOptions()
      .subscribe((config: OptionConfig[]) => this.config = config);
    this.initForm();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
  }

  public openDialogCreateMerchant(): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent);

    dialogRef.afterClosed().subscribe((merchant) => {
      this.form.get('merchantInfo').patchValue(merchant);
    });
  }

  public openDialogSelectMerchant(): void {
    const dialogRef = this.dialog.open(SelectMerchantComponent);

    dialogRef.afterClosed().subscribe((merchant) => {
      this.form.get('merchantInfo').patchValue(merchant);
    });
  }

  public deleteMerchant(): void {
    this.form.get('merchantInfo').patchValue(null);
  }

  private initForm(): void {
    this.form = this.newRewardFormService.getForm();
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
    this.form.patchValue(this.newRewardFormService.getDefaultValue());
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }
}
