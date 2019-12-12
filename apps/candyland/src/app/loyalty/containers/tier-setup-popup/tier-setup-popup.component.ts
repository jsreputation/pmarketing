import { Component, ChangeDetectionStrategy, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { Subject } from 'rxjs';
import { LoyaltyCustomTierFormsService } from '../../services/loyalty-custom-tier-forms.service';
import { PeriodType } from '@cl-core/models/period-type.enum';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-tier-setup-popup',
  templateUrl: './tier-setup-popup.component.html',
  styleUrls: ['./tier-setup-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TierSetupPopupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  protected destroy$: Subject<void> = new Subject();
  public pointsExpirePeriodType: typeof PeriodType = PeriodType;

  constructor(
    public dialogRef: MatDialogRef<TierSetupPopupComponent>,
    private customTierFormsService: LoyaltyCustomTierFormsService,
    private customTierService: LoyaltyCustomTierService,
    @Inject(MAT_DIALOG_DATA) public data: { basicTierId: string, tier: ICustomTireForm | null, config: any }
  ) {
  }

  public get pointsThreshold(): AbstractControl {
    return this.form.get('joinMethod.pointsThreshold') || null;
  }

  public get points(): AbstractControl {
    return this.form.get('joinMethod.points') || null;
  }

  public get name(): AbstractControl {
    return this.form.get('name') || null;
  }

  public get imageUrl(): AbstractControl {
    return this.form.get('imageUrl') || null;
  }

  public get earnBonus(): AbstractControl {
    return this.form.get('earnBonus') || null;
  }

  public get burnDiscount(): AbstractControl {
    return this.form.get('burnDiscount') || null;
  }

  public get joinMethod(): AbstractControl {
    return this.form.get('joinMethod') || null;
  }

  public get amount(): AbstractControl {
    return this.form.get('pointsExpiry.amount') || null;
  }

  public ngOnInit(): void {
    this.initForm();
    this.fillForm();
    this.handlePointsThreshold();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let request;
    if (this.data.tier) {
      request = this.customTierService.updateCustomTier(this.data.tier.id, this.form.value, this.data.basicTierId);
    } else {
      request = this.customTierService.createCustomTier(this.form.value, this.data.basicTierId);
    }
    request.subscribe(data => this.dialogRef.close(data));
  }

  private initForm(): void {
    this.form = this.customTierFormsService.getTireForm();
  }

  private fillForm(): void {
    const pathValue = this.data.tier || this.customTierFormsService.getDefaultValueTireForm();
    this.form.patchValue(pathValue);
  }

  private handlePointsThreshold(): void {
    this.pointsThreshold.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe((value: boolean) => {
      if (value) {
        this.points.enable({onlySelf: true, emitEvent: false});
      } else {
        this.points.reset(null, {onlySelf: true, emitEvent: false});
        this.points.disable({onlySelf: true, emitEvent: false});
      }
      this.points.updateValueAndValidity({onlySelf: true, emitEvent: false});
    });
  }
}
