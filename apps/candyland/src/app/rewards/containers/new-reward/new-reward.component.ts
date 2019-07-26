import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {CampaignCreationStoreService} from '@cl-core/services/campaigns-creation-store.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

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
      {title: 'Single code', value: 'Period'},
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

  private formChanged;
  private defaultFormValue = {
    campaignInfo: {
      disabledEndDate: false
    },
    channel: {
      type: 'weblink',
      schedule: {
        enableRecurrence: false,
        recurrence: {
          repeatOn: []
        }
      }
    }
  };

  public get name() {
    return this.form.get('name');
  }

  public get campaignInfo() {
    return this.form.get('campaignInfo');
  }

  public get channel() {
    return this.form.get('channel');
  }

  public get schedule() {
    return this.form.get('channel').get('schedule');
  }

  public get recurrence() {
    return this.form.get('channel').get('schedule').get('recurrence');
  }

  public get audience() {
    return this.form.get('audience');
  }

  constructor(
    private store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(value => {
        this.store.updateCampaign(value);
        // this.updateFormStructure();
      });

    this.form.patchValue(this.defaultFormValue);
  }

  private initForm() {
    this.form = this.fb.group({
      name: [],
      rewardInfo: this.fb.group({
        image: [],
        rewardType: [],
        category: [],
        redemptionType: [],
        cost: [],
        description: [],
        termsAndCondition: []
      }),
      limits: this.fb.group({}),
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
      }),
      channel: this.fb.group({
        type: [],
        message: [],
        schedule: this.fb.group({
          sendDate: [],
          sendTime: [],
          enableRecurrence: [],
          recurrence: this.fb.group({
            times: [],
            period: [],
            repeatOn: []
          })

        })
      }),
      audience: this.fb.group({
        type: ['none'],
        file: []
      })
    });
  }

  // private updateFormStructure() {
  //   this.formChanged = false;
  //
  //   this.toggleControls(
  //     this.campaignInfo.get('disabledEndDate').value === false,
  //     [this.campaignInfo.get('endDate'), this.campaignInfo.get('endTime')],
  //     true
  //   );
  //
  //   this.toggleControls(
  //     this.channel.get('type').value === 'sms',
  //     [this.channel.get('message'), this.schedule]
  //   );
  //
  //   this.toggleControls(
  //     this.schedule.get('enableRecurrence').value === true,
  //     [this.recurrence]
  //   );
  //
  //   this.toggleControls(
  //     this.recurrence.get('period').value === 'week',
  //     [this.recurrence.get('repeatOn')]
  //   );
  //
  //   this.toggleControls(
  //     this.audience.get('type').value === 'upload',
  //     [this.audience.get('file')]
  //   );
  //
  //   if (this.formChanged) {
  //     this.updateForm();
  //   }
  // }

  private toggleControls(condition: boolean, controls: AbstractControl[], resetValue = false) {
    if (condition) {
      controls.forEach(control => this.enableControl(control));
    } else {
      controls.forEach(control => {
        this.disableControl(control, resetValue);
      });
    }
  }

  private enableControl(control: AbstractControl) {
    if (control.disabled && !(control.parent && control.parent.disabled)) {
      control.enable({emitEvent: false});
      this.formChanged = true;
    }
  }

  private disableControl(control: AbstractControl, resetValue = false) {
    if (control.enabled) {
      control.disable({emitEvent: false});
      if (resetValue) {
        control.reset(null, {emitEvent: false});
      }
      this.formChanged = true;
    }
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }
}
