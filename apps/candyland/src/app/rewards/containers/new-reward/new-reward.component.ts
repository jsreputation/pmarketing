import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToggleControlService } from '@cl-shared/providers/toggle-control.service';
import { MatDialog } from '@angular/material';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';
import { SelectMerchantComponent } from '@cl-shared/containers/select-merchant/select-merchant.component';

@Component({
  selector: 'cl-new-reward',
  templateUrl: './new-reward.component.html',
  styleUrls: ['./new-reward.component.scss']
})
export class NewRewardComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public config = {
    rewardType: [
      {title: 'Free', value: 'Free'},
      {title: 'Cashback', value: 'Cashback'},
      {title: 'Points', value: 'Points'},
      {title: 'Buy X Get Y', value: 'Buy X Get Y'},
      {title: 'Fixed Discount Amount', value: 'Fixed Discount Amount'},
      {title: 'Fixed Discount Item', value: 'Fixed Discount Item'},
      {title: 'Percent Discount', value: 'Percent Discount'},
      {title: 'Set Price Coupon', value: 'Set Price Coupon'}
    ],
    durationLimits: [
      {title: 'Day', value: 'day'},
      {title: 'Week', value: 'week'},
      {title: 'Month', value: 'month'}
    ],
    redemptionType: [
      {title: 'QR Code', value: 'QR Code'},
      {title: 'Bar Code', value: 'Bar Code'},
      {title: 'Merchant PIN', value: 'Merchant PIN'},
      {title: 'Promo Code', value: 'Promo Code'}
    ],
    category: [
      {title: 'Food & Beverage', value: 'Food & Beverage'},
      {title: 'Travel', value: 'Travel'},
      {title: 'Electronics', value: 'Electronics'},
      {title: 'Wellness', value: 'Wellness'},
      {title: 'Entertainment', value: 'Entertainment'},
      {title: 'Shopping', value: 'Shopping'},
      {title: 'Merchant Self', value: 'Merchant Self'},
      {title: 'Others', value: 'Others'}
    ],
    voucherCodeFormat: [
      {title: 'Alphanumeric  (eg.ABC123)', value: 'alphanumeric'},
      {title: 'Numeric (eg.123456)', value: 'numeric'},
      {title: 'Alphabet (eg.ABCDEF)', value: 'alphabet'}
    ],
    voucherCodeTypes: [
      {title: 'Single code', value: 'Single code'},
      {title: 'Unique codes: System generated', value: 'Unique codes: System generated'},
      {title: 'Unique codes: User upload', value: 'Unique codes: User upload'}
    ],
    voucherValidityType: [
      {title: 'Period', value: 'Period'},
      {title: 'Issuance date', value: 'Issuance date'}
    ],
    goals: [
      {title: 'Build awareness', value: 'Build awareness'},
      {title: 'Acquire customers', value: 'Acquire customers'},
      {title: 'Drive sales', value: 'Drive sales'},
      {title: 'Re-engage audience', value: 'Re-engage audience'},
      {title: 'Surprise & Delight', value: 'Surprise & Delight'}
    ],
    channelTypes: [
      {title: 'Weblink', value: 'weblink'},
      {title: 'SMS', value: 'sms'}
    ]
  };
  private defaultFormValue = {
    rewardInfo: {
      redemptionType: 'QR Code'
    },
    vouchers: {
      voucherCode: {
        type: 'Single code'
      },
      voucherValidity: {
        type: 'Period'
      }
    }
  };

  constructor(public cd: ChangeDetectorRef,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private toggleControlService: ToggleControlService) {
  }

  ngOnInit() {
    this.initForm();
    this.initToggleForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(() => {
        this.toggleControlService.updateFormStructure();
        if (this.toggleControlService.formChanged) {
          this.updateForm();
        }
      });

    this.form.patchValue(this.defaultFormValue);
  }

  ngOnDestroy(): void {
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

  public deleteMerchant() {
    this.form.get('merchantInfo').patchValue(null);
  }

  private initForm() {
    this.form = this.fb.group({
      name: [''],
      rewardInfo: this.fb.group({
        image: [],
        rewardType: [],
        category: [],
        redemptionType: [],
        cost: [],
        description: [],
        termsAndCondition: []
      }),
      merchantInfo: [],
      vouchers: this.fb.group({
        voucherCode: this.fb.group({
          type: [],
          total: [],
          singleCode: this.fb.group({
            code: [null]
          }),
          uniqueGeneratedCode: this.fb.group({
            prefix: [],
            codeFormat: [],
            length: []
          }),
          uniqueUserUploadCode: this.fb.group({
            file: []
          }),
          merchantPIN: this.fb.group({
            code: [null]
          })
        }),
        voucherValidity: this.fb.group({
          type: [],
          period: this.fb.group({
            startDate: [],
            startTime: [],
            endDate: [],
            endTime: [],
            disabledEndDate: []
          }),
          issuanceDate: this.fb.group({
            times: [],
            duration: []
          })
        })
      }),
      limits: this.fb.group({
        enabledVoucherPerCampaign: [],
        voucherPerCampaign: this.fb.group({
          vouchers: [],
          duration: []
        }),
        enabledIssuancePerUser: [],
        issuancePerUser: this.fb.group({
          times: [],
          duration: []
        }),
        enabledRedemptionPerUser: [],
        redemptionPerUser: this.fb.group({
          times: [],
          duration: []
        })
      })
    });
  }

  private initToggleForm() {
    this.toggleControlService.context = this;
    this.toggleControlService.config = [
      {
        condition: () => (this.form.get('rewardInfo.redemptionType').value === 'Merchant PIN'),
        controls: [this.form.get('vouchers.voucherCode.merchantPIN')]
      },
      {
        condition: () => (this.form.get('vouchers.voucherCode.type').value === 'Single code'),
        controls: [this.form.get('vouchers.voucherCode.singleCode')]
      },
      {
        condition: () => (this.form.get('vouchers.voucherCode.type').value === 'Unique codes: System generated'),
        controls: [this.form.get('vouchers.voucherCode.uniqueGeneratedCode')]
      },
      {
        condition: () => (this.form.get('vouchers.voucherCode.type').value === 'Unique codes: User upload'),
        controls: [this.form.get('vouchers.voucherCode.uniqueUserUploadCode')]
      },
      {
        condition: () => (this.form.get('vouchers.voucherValidity.type').value === 'Period'),
        controls: [this.form.get('vouchers.voucherValidity.period')]
      },
      {
        condition: () => (this.form.get('vouchers.voucherValidity.type').value === 'Issuance date'),
        controls: [this.form.get('vouchers.voucherValidity.issuanceDate')]
      },
      {
        condition: () => (!this.form.get('vouchers.voucherValidity.period.disabledEndDate').value),
        controls: [this.form.get('vouchers.voucherValidity.period.endTime'), this.form.get('vouchers.voucherValidity.period.endDate')],
        resetValue: true
      },
      {
        condition: () => (this.form.get('limits.enabledVoucherPerCampaign').value === true),
        controls: [this.form.get('limits.voucherPerCampaign')]
      },
      {
        condition: () => (this.form.get('limits.enabledIssuancePerUser').value === true),
        controls: [this.form.get('limits.issuancePerUser')]
      },
      {
        condition: () => (this.form.get('limits.enabledRedemptionPerUser').value === true),
        controls: [this.form.get('limits.redemptionPerUser')]
      }
    ];
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }
}
