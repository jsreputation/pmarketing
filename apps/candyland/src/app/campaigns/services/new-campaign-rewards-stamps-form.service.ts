import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';

@Injectable()
export class NewCampaignRewardsStampsFormService {
  constructor(private fb: FormBuilder) {
  }

  public getForm(): FormGroup {
    return this.fb.group({
      rewardsList: this.fb.array([]),
      stampsRule: this.fb.group({
        sequence: [],
        rules: this.fb.array([
          this.fb.control(null)
        ])
      }),
      limits: this.fb.group({
        enableStampCard: [true],
        stampCard: this.fb.group({
          perCampaign: [null, [Validators.max(1000)]],
          perUser: [null, [Validators.max(1000)]],
          duration: []
        }),
        enableStamp: [true],
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

  public getDefaultValue() {
    return {
      rewardsList: [
        {
          stampSlotNumber: 2,
          rewardsOptions: {
            enableProbability: true,
            rewards: [
              {
                value: null,
                probability: 5
              },
              {
                value: {
                  id: 1,
                  image: 'assets/images/mask-group.png',
                  name: 'Free Coffee',
                  type: 'Starbucks',
                  current: 500,
                  total: 1000
                },
                probability: 20
              },
              {
                value: {
                  id: 2,
                  image: 'assets/images/mask-group.png',
                  name: 'Free Coffee 2',
                  type: 'Starbucks',
                  current: 500,
                  total: 800
                },
                probability: 43
              }
            ]
          }
        },
        {
          stampSlotNumber: 4,
          rewardsOptions: {
            enableProbability: false,
            rewards: [
              {
                value: {
                  id: 1,
                  image: 'assets/images/mask-group.png',
                  name: 'Free Coffee',
                  type: 'Starbucks',
                  current: 500,
                  total: 1000
                }
              },
              {
                value: {
                  id: 2,
                  image: 'assets/images/mask-group.png',
                  name: 'Free Coffee 2',
                  type: 'Starbucks',
                  current: 500,
                  total: 800
                }
              }
            ]
          }
        }
      ],
      stampsRule: {
        sequence: true,
        rules: [
          {
            'ruleType': 'review',
            'product': 'productC'
          },
          {
            'ruleType': 'purchase',
            'product': 'productB'
          },
          {
            'ruleType': 'transaction',
            'condition': {
              'rule': 'isMoreThan',
              'value': 54
            }
          },
          {
            'ruleType': 'Bill payment'
          },
          {
            'ruleType': 'Reward redeemed'
          },
          {
            'ruleType': 'Sign up'
          },
          {
            'ruleType': 'Bill payment'
          },
          {
            'ruleType': 'Sign up'
          },
          {
            'ruleType': 'review',
            'product': 'productB'
          },
          {
            'ruleType': 'transaction',
            'condition': {
              'rule': 'isMoreThan',
              'value': 47
            }
          }
        ]
      }
    };
  }
}
