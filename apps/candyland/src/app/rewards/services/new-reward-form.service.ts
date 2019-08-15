import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';

@Injectable()
export class NewRewardFormService {
  constructor(private fb: FormBuilder) {
  }

  public getForm(): FormGroup {
    return this.fb.group({
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

  public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
    return [
      {
        condition: form.get('rewardInfo.redemptionType').value === 'Merchant PIN',
        controls: [form.get('vouchers.voucherCode.merchantPIN')]
      },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'Single code',
        controls: [form.get('vouchers.voucherCode.singleCode')]
      },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'Unique codes: System generated',
        controls: [form.get('vouchers.voucherCode.uniqueGeneratedCode')]
      },
      {
        condition: form.get('vouchers.voucherCode.type').value === 'Unique codes: User upload',
        controls: [form.get('vouchers.voucherCode.uniqueUserUploadCode')]
      },
      {
        condition: form.get('vouchers.voucherValidity.type').value === 'Period',
        controls: [form.get('vouchers.voucherValidity.period')]
      },
      {
        condition: form.get('vouchers.voucherValidity.type').value === 'Issuance date',
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
          type: 'Single code'
        },
        voucherValidity: {
          type: 'Period'
        }
      }
    };
  }
}
