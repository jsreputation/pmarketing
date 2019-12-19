import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsMenu } from '../models/notifications-menu-enum';
import Utils from '@cl-helpers/utils';

@Injectable()
export class CampaignChannelsFormService {
  public notificationsFormGroups: typeof NotificationsMenu = NotificationsMenu;

  public getForm(): FormGroup {
    return new FormGroup({
      webNotification: new FormGroup({
        webLink: new FormControl(null),
        webLinkOptions: new FormControl(null),
        id: new FormControl(null),
      }),
      sms: new FormControl(null),
      launch: new FormArray([]), // this.getLaunchGroup()
      completed: new FormArray([]), // this.getCompletedGroup()
      campaignEnds: new FormArray([]),
      // rewardExpires: new FormArray([]),
      // noStampsReward: new FormArray([]),
      // earnedStamp: new FormArray([]),
      // earnedReward: new FormArray([]),
    });
  }

  public getLaunchGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      sentType: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
      birthdayTime: new FormControl(null),
      launchDateTime: new FormControl(null),
      monthDay: new FormControl(null, [Validators.min(1), Validators.max(31)]),
      channel: new FormControl('sms'),
      campaignId: new FormControl(null),
    });
  }

  public getCompletedGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      sentType: new FormControl('campaign_incomplete'),
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
  }

  public getRewardExpiresGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
  }

  public getCampaignEndsGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      sentType: new FormControl('campaign_status_update'),
      numberPeriod: new FormControl(null, [Validators.required, Validators.min(1)]),
      type: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
  }

  public getNoStampsRewardGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      slot: new FormControl(null, [Validators.required]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
  }

  public getEarnedStampGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      stamp: new FormControl(null, [Validators.required, Validators.min(1)]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
    });
  }

  public getEarnedRewardGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      slot: new FormControl(null, [Validators.required, Validators.min(1)]),
      template: new FormGroup({
        message: new FormControl(null, [Validators.required]),
        templateId: new FormControl(null),
      }),
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
    (form.get(this.notificationsFormGroups.earnedStamp) as FormArray).push(this.getEarnedStampGroup());
  }

  public deleteEarnedStampGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.earnedStamp) as FormArray).removeAt(index);
  }

  public deleteEarnedRewardGroup(form: FormGroup, index: number): void {
    (form.get(this.notificationsFormGroups.earnedReward) as FormArray).removeAt(index);
  }

  public addNewEarnedRewardGroup(form: FormGroup): void {
    (form.get(this.notificationsFormGroups.earnedReward) as FormArray).push(this.getEarnedRewardGroup());
  }

  public getShortCodes(): any[] {
    return [
      {title: 'Campaign Url', value: '[campaignUrl]'},
      {title: 'User ID', value: '[userId]'},
      {title: 'First name', value: '[userFirstName]'},
      {title: 'Last name', value: '[userLastName]'},
      {title: 'Salutation', value: '[salutation]'}
    ];
  }

  public getDefaultValue(): { [key: string]: any } {
    return {
      webLink: true,
      sms: true,
      webLinkOptions: 'collect_identifier',
      launch: [{
        sentType: 'campaign_launch_date',
        sentDay: null,
        sentTime: null,
        message: 'null [userId] sdfgsdfg [userFirstName] ',
        birthdayTime: null,
        monthDay: null
      }, {
        sentType: 'users_date_birth',
        sentDay: null,
        sentTime: null,
        message: 'null [userLastName] asdfasdfasdf',
        birthdayTime: '03:20',
        monthDay: null
      }, {
        sentType: 'users_month_birth',
        sentDay: null,
        sentTime: null,
        message: 'null [userId]  asdfasdfasdf',
        birthdayTime: '15:15',
        monthDay: 3423
      }],
      completed: [{
        numberPeriod: 33,
        type: 'day',
        time: '15:15',
        message: 'ttttttttttttttttttt [campaignUrl] '
      }, {numberPeriod: 4444, type: 'month', time: '18:30', message: 'null [userLastName] 33333333333333333333333'}],
      campaignEnds: [{
        numberPeriod: 666,
        type: 'day',
        time: '16:20',
        message: 'null [campaignUrl] 66666666'
      }, {numberPeriod: 999, type: 'year', time: '17:25', message: 'null [userLastName] '}],
      rewardExpires: [{numberPeriod: 44, type: 'week', time: '17:25', message: '2344243 [userId] '}, {
        numberPeriod: 44,
        type: 'day',
        time: '14:10',
        message: '444444 [userId] '
      }],
      noStampsReward: [{stamp: 3, slot: 10, message: '232324 [userId] '}, {
        stamp: 6,
        slot: 10,
        message: 'e567456745764567 [salutation] '
      }],
      earnedStamp: [{stamp: 5, message: 'sgfsdfgsdfg [campaignUrl] '}, {
        stamp: 3,
        message: 'asdfasdfasdf [userLastName] '
      }],
      earnedReward: [{slot: 5, message: 'null [userId] asdfasdfasdf'}, {
        slot: 3,
        message: 'null [userLastName] asdfasdfasdf'
      }]
    };
  }

  public patchForm(form: FormGroup, value: any): void {
    form.patchValue(value);
    Object.keys(value).forEach((key) => {
      if (Utils.isArray(value[key])) {
        value[key].forEach((item) => {
          const formGroup: FormGroup = this.formGroupsMap(key);
          formGroup.patchValue(item);
          (form.get(key) as FormArray).push(formGroup);
        });
          } else {
        form.patchValue({[key]: value[key]}, {onlySelf: false, emitEvent: false});
      }
    });
  }

  private formGroupsMap(name: string): FormGroup {
    const mapGroups = {
      [this.notificationsFormGroups.onCampaignLaunch]: this.getLaunchGroup(),
      [this.notificationsFormGroups.campaignNotCompleted]: this.getCompletedGroup(),
      [this.notificationsFormGroups.beforeCampaignEnds]: this.getCampaignEndsGroup(),
      [this.notificationsFormGroups.beforeRewardExpires]: this.getRewardExpiresGroup(),
      [this.notificationsFormGroups.noOfStampsToNextReward]: this.getNoStampsRewardGroup(),
      [this.notificationsFormGroups.earnedStamp]: this.getEarnedStampGroup(),
      [this.notificationsFormGroups.earnedReward]: this.getEarnedRewardGroup(),
    };
    return mapGroups[name];
  }
}
