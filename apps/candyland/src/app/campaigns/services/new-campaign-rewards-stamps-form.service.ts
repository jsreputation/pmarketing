import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';

@Injectable()
export class NewCampaignRewardsStampsFormService {
  constructor(private fb: FormBuilder) {
  }

  public getForm(): FormGroup {
    return this.fb.group({
      limits: this.fb.group({})
    });
  }

  public getLimitsForm(type: string): FormGroup {
    let formInit: FormGroup = this.fb.group({
      times: [null, [
        // Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]],
      duration: [null, [
        // Validators.required
      ]],
      id: null
    });

    if (type === 'stamps') {
      formInit = this.fb.group({
        stampsRule: this.fb.group({
          sequence: [],
          rules: this.fb.array([
            this.fb.control(null)
          ])
        }),
        limits: this.fb.group({
          enableStampCard: [false],
          stampCard: this.fb.group({
            perCampaign: [null, [Validators.max(1000)]],
            perUser: [null, [Validators.max(1000)]],
            duration: []
          }),
          enableStamp: [false],
          stamp: this.fb.group({
            perUser: [null, [Validators.max(1000)]],
            duration: []
          })
        }),
        enableStampCardsValidity: [],
        stampCardsValidity: this.fb.group({
          times: [],
          duration: []
        })
      });
    }

    return formInit;
  }

  public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
    return [
      {
        condition: form.get('limits.enableStampCard').value === true,
        controls: [form.get('limits.stampCard')]
      },
      {
        condition: form.get('limits.enableStamp').value === true,
        controls: [form.get('limits.stamp')]
      },
      {
        condition: form.get('enableStampCardsValidity').value === true,
        controls: [form.get('stampCardsValidity')]
      }
    ];
  }

  public getDefaultValue(type: string): { [key: string]: any } {
    let defaultValue: { [key: string]: any } = {};

    if (type === 'stamps') {
      defaultValue = {
        stampsRule: {
          sequence: true,
          rules: [
            {
              ruleType: 'review',
              product: 'productC'
            },
            {
              ruleType: 'purchase',
              product: 'productB'
            },
            {
              ruleType: 'transaction',
              condition: {
                rule: 'isMoreThan',
                value: 54
              }
            },
            {
              ruleType: 'Bill payment'
            },
            {
              ruleType: 'Reward redeemed'
            },
            {
              ruleType: 'Sign up'
            },
            {
              ruleType: 'Bill payment'
            },
            {
              ruleType: 'Sign up'
            },
            {
              ruleType: 'review',
              product: 'productB'
            },
            {
              ruleType: 'transaction',
              condition: {
                rule: 'isMoreThan',
                value: 47
              }
            }
          ]
        }
      };
    }
    return defaultValue;
  }
}
