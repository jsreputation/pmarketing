import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsMenu } from '../models/notifications-menu-enum';

@Injectable()
export class CampaignChannelsFormService {
  public notificationsFormGroups: typeof NotificationsMenu = NotificationsMenu;

  public getForm(): FormGroup {
    return new FormGroup({
      webLink: new FormControl(null),
      sms: new FormControl(null),
      webLinkOptions: new FormControl(null),
      launch: new FormArray([this.getLaunchGroup()]),
      completed: new FormArray([this.getCompletedGroup()]),
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
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  public getRewardExpiresGroup(): FormGroup {
    return new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  public getCampaignEndsGroup(): FormGroup {
    return new FormGroup({
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  public getNoStampsRewardGroup(): FormGroup {
    return new FormGroup({
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      slot: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  public getEarnedStampGroup(): FormGroup {
    return new FormGroup({
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  public addNewLaunchGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.onCampaignLaunch) as FormArray).push(this.getLaunchGroup());
  }

  public deleteLaunchGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.onCampaignLaunch) as FormArray).removeAt(index);
  }

  public addNewCompletedGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.campaignNotCompleted) as FormArray).push(this.getCompletedGroup());
  }

  public deleteCompletedGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.campaignNotCompleted) as FormArray).removeAt(index);
  }

  public addNewCampaignEndsGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.beforeCampaignEnds) as FormArray).push(this.getCampaignEndsGroup());
  }

  public deleteCampaignEndsGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.beforeCampaignEnds) as FormArray).removeAt(index);
  }

  public addNewRewardExpiresGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.beforeRewardExpires) as FormArray).push(this.getRewardExpiresGroup());
  }

  public deleteRewardExpiresGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.beforeRewardExpires) as FormArray).removeAt(index);
  }

  public addNewNoStampsRewardGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.noOfStampsToNextReward) as FormArray).push(this.getNoStampsRewardGroup());
  }

  public deleteNoStampsRewardGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.noOfStampsToNextReward) as FormArray).removeAt(index);
  }

  public addNewEarnedStampGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.earnedStamp) as FormArray).push(this.getNoStampsRewardGroup());
  }

  public deleteEarnedStampGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.earnedStamp) as FormArray).removeAt(index);
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
