import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';

@Injectable()
export class NewRewardFormService {
  constructor(private fb: FormBuilder) {
  }

  public getForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      rewardInfo: this.fb.group({
        image: [null, [Validators.required]],
        rewardType: this.fb.control(null, [Validators.required]),
        category: this.fb.control(null, [Validators.required]),
        redemptionType: [],
        cost: this.fb.control(null, [Validators.required]),
        description: [],
        termsAndCondition: [],
        tags: [],
        merchantId: [null],
      }),
      vouchers: this.fb.group({
        voucherCode: this.fb.group({
          type: [],
          singleCode: this.fb.group({
            code: [null]
          }),
          uniqueGeneratedCode: this.fb.group({
            prefix: [null],
            codeFormat: [null],
            length: [null]
          }),
          uniqueUserUploadCode: this.fb.group({
            //   file: []
          })
          // merchantPIN: this.fb.group({
          //   code: [null]
          // })
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

  public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
    return [
      // {
      //   condition: form.get('rewardInfo.redemptionType').value === 'Merchant PIN',
      //   controls: [form.get('vouchers.voucherCode.merchantPIN')]
      // },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'single_code' || form.get('rewardInfo.redemptionType').value === 'Merchant PIN',
        controls: [form.get('vouchers.voucherCode.singleCode')]
      },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'system_generated',
        controls: [form.get('vouchers.voucherCode.uniqueGeneratedCode')]
      },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'user_uploaded' && form.get('rewardInfo.redemptionType').value !== 'Merchant PIN',
        controls: [form.get('vouchers.voucherCode.uniqueUserUploadCode')]
      },
      {
        condition: form.get('vouchers.voucherValidity.type').value === 'period',
        controls: [form.get('vouchers.voucherValidity.period')]
      },
      {
        condition: form.get('vouchers.voucherValidity.type').value === 'issuance_date',
        controls: [form.get('vouchers.voucherValidity.issuanceDate')]
      },
      {
        condition: !form.get('vouchers.voucherValidity.period.disabledEndDate').value,
        controls: [
          form.get('vouchers.voucherValidity.period.endTime'),
          form.get('vouchers.voucherValidity.period.endDate')
        ],
        resetValue: true
      },
      {
        condition: form.get('limits.enabledVoucherPerCampaign').value === true,
        controls: [form.get('limits.voucherPerCampaign')]
      },
      {
        condition: form.get('limits.enabledIssuancePerUser').value === true,
        controls: [form.get('limits.issuancePerUser')]
      },
      {
        condition: form.get('limits.enabledRedemptionPerUser').value === true,
        controls: [form.get('limits.redemptionPerUser')]
      }
    ];
  }

  public getDefaultValue(): { [key: string]: any } {
    return {
      rewardInfo: {
        redemptionType: 'QR Code'
      },
      vouchers: {
        voucherCode: {
          type: 'single_code'
        },
        voucherValidity: {
          type: 'period'
        }
      }
    };
  }
}
