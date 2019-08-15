import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NewRewardFormService } from '../../services/new-reward-form.service';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';
import { SelectMerchantComponent } from '@cl-shared/containers/select-merchant/select-merchant.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RewardsService } from '@cl-core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styleUrls: ['./manage-rewards.component.scss']
})
export class ManageRewardsComponent implements OnInit, OnDestroy {
  @Input() public reward$: Observable<Reward>;
  @Output() public actionCancel = new EventEmitter();
  @Output() public actionSave = new EventEmitter();
  public form: FormGroup;
  public config: OptionConfig[];
  constructor(public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              private rewardService: RewardsService,
              private newRewardFormService: NewRewardFormService,
              private toggleControlService: ToggleControlService) {
  }
  public ngOnInit(): void {
    this.rewardService.getRewardsOptions()
      .subscribe((config: OptionConfig[]) => this.config = config);
    this.initForm();
    this.patchValue();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
  }

  public cancel(): void {
    this.actionCancel.emit();
  }

  public save(): void {
    this.actionSave.emit(this.form.value);
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
    if (!this.reward$) {
      this.form.patchValue(this.newRewardFormService.getDefaultValue());
    }
  }

  private updateForm(): void {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  private patchValue(): void {
    if (this.reward$) {
      this.reward$
        .pipe(
          untilDestroyed(this)
        )
        .subscribe((reward) => {
          this.form.patchValue({
            name: reward.name, rewardInfo: {
              image: reward.image, category: reward.category, rewardType: reward.type,
            }
          });
        });

    }
  }
}
