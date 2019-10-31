import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToggleControlConfig } from 'src/app/core/models/toggle-control-config.interface';

@Injectable()
export class CampaignChannelsFormService {

  public getForm(): FormGroup {
    // return this.fb.group({
    //   rewardsListCollection: this.fb.array([]),
    //   stampsRule: this.fb.group({
    //     sequence: [],
    //     rules: this.fb.array([
    //       this.fb.control(null)
    //     ])
    //   }),
    //   limits: this.fb.group({
    //     enableStampCard: [false],
    //     stampCard: this.fb.group({
    //       perCampaign: [null, [Validators.max(1000)]],
    //       perUser: [null, [Validators.max(1000)]],
    //       duration: []
    //     }),
    //     enableStamp: [false],
    //     stamp: this.fb.group({
    //       perUser: [null, [Validators.max(1000)]],
    //       duration: []
    //     })
    //   }),
    //   enableStampCardsValidity: [],
    //   stampCardsValidity: this.fb.group({
    //     times: [],
    //     duration: []
    //   })
    // });
    return new FormGroup({
      webLink: new FormControl(null),
      sms: new FormControl(null),
      webLinkOptions: new FormControl(null),
      launch: new FormArray([this.getLaunchGroup()]),
      completed: new FormArray([]),
      campaignEnds: new FormArray([]),
      rewardExpires: new FormArray([]),
      noStampsReward: new FormArray([]),
      earnedStamp: new FormArray([]),
      earnedReward: new FormArray([]),
    });
  }

  public getLaunchGroup(): FormGroup {
    return new FormGroup({
      sentType: new FormControl(null, [Validators.required]),
      sentDay: new FormControl(null, [Validators.required]),
      sentTime: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      birthdayTime: new FormControl(null),
      monthDay: new FormControl(null, [Validators.min(1), Validators.max(31)]),
    });
  }

  public getCompletedGroup(): FormGroup {
    return new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      periodType: new FormControl(null, [Validators.required])
      time: new FormControl(null, [Validators.required])
    });
  }

  public addNewLaunchGroup(form: FormGroup): void {
    (form.get('launch') as FormArray).push(this.getLaunchGroup());
  }

  public deleteLaunchGroup(form: FormGroup, index: number): void {
    (form.get('launch') as FormArray).removeAt(index);
  }

  public getShortCodes(): any[] {
    return [
      { title: 'Campaign Url', value: '[campaignUrl]' },
      { title: 'User ID', value: '[userId]' },
      { title: 'First name', value: '[userFirstName]' },
      { title: 'Last name', value: '[userLastName]' },
      { title: 'Salutation', value: '[salutation]' }
      ];
  }

  // public getToggleConfig(form: FormGroup): ToggleControlConfig[] {
  //   return [
  //     {
  //       condition: form.get('limits.enableStampCard').value === true,
  //       controls: [form.get('limits.stampCard')]
  //     },
  //     {
  //       condition: form.get('limits.enableStamp').value === true,
  //       controls: [form.get('limits.stamp')]
  //     },
  //     {
  //       condition: form.get('enableStampCardsValidity').value === true,
  //       controls: [form.get('stampCardsValidity')]
  //     }
  //   ];
  // }

  public getDefaultValue(): { [key: string]: any } {
    return {
      rewardsList: [
        // {
        //   stampSlotNumber: 2,
        //   rewardsOptions: {
        //     enableProbability: true,
        //     rewards: [
        //       {
        //         value: null,
        //         probability: 5
        //       },
        //       {
        //         value: {
        //           id: 1,
        //           image: 'assets/images/placeholders/mask-group.png',
        //           name: 'Free Coffee',
        //           type: 'Starbucks',
        //           current: 500,
        //           total: 1000
        //         },
        //         probability: 20
        //       },
        //       {
        //         value: {
        //           id: 2,
        //           image: 'assets/images/placeholders/mask-group.png',
        //           name: 'Free Coffee 2',
        //           type: 'Starbucks',
        //           current: 500,
        //           total: 800
        //         },
        //         probability: 43
        //       }
        //     ]
        //   }
        // },
        // {
        //   stampSlotNumber: 4,
        //   rewardsOptions: {
        //     enableProbability: false,
        //     rewards: [
        //       {
        //         value: {
        //           id: 1,
        //           image: 'assets/images/placeholders/mask-group.png',
        //           name: 'Free Coffee',
        //           type: 'Starbucks',
        //           current: 500,
        //           total: 1000
        //         }
        //       },
        //       {
        //         value: {
        //           id: 2,
        //           image: 'assets/images/placeholders/mask-group.png',
        //           name: 'Free Coffee 2',
        //           type: 'Starbucks',
        //           current: 500,
        //           total: 800
        //         }
        //       }
        //     ]
        //   }
        // }
      ],
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
}
