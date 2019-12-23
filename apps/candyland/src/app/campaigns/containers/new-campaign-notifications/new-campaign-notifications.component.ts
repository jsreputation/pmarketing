import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { StampsService } from '@cl-core-services';
import { ICampaign } from '@cl-core/models/campaign/campaign';

@Component({
  selector: 'cl-new-campaign-notifications',
  templateUrl: './new-campaign-notifications.component.html',
  styleUrls: ['./new-campaign-notifications.component.scss'],
})
export class NewCampaignNotificationsComponent implements OnInit, OnDestroy {
  @Input() public channelForm: FormGroup;
  @Output() public sendTestSms: EventEmitter<any> = new EventEmitter();
  public notificationsMenu: typeof NotificationsMenu = NotificationsMenu;
  public selectedMenu: string = NotificationsMenu.onCampaignLaunch;
  public destroy$: Subject<void> = new Subject<void>();
  public campaign: ICampaign;
  public shortCodes: any[];
  public stampSlotNumbers: CommonSelect[];
  public allStampSlotNumbers: CommonSelect[];
  public stampNumbers: CommonSelect[];
  constructor(private campaignChannelsFormService: CampaignChannelsFormService,
              public store: CampaignCreationStoreService,
              private cd: ChangeDetectorRef,
              private stampsService: StampsService) {}

  public ngOnInit(): void {
    this.getShortCodes();
    this.getStampData();
    this.subscribeToStore();
  }

  public onSendSms(sms: any): void {
    this.sendTestSms.emit(sms);
  }

  public patchForm(value: any): void {
    this.campaignChannelsFormService.patchForm(this.channelForm, value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectMenu(currentItem: string): void {
    this.selectedMenu = currentItem;
  }

  public addNewLaunchGroup(): void {
    this.campaignChannelsFormService.addNewLaunchGroup(this.channelForm);
  }

  public deleteLaunchGroup(index: number): void {
    this.campaignChannelsFormService.deleteLaunchGroup(this.channelForm, index);
  }

  public addNewCompletedGroup(): void {
    this.campaignChannelsFormService.addNewCompletedGroup(this.channelForm);
  }

  public deleteCompletedGroup(index: number): void {
    this.campaignChannelsFormService.deleteCompletedGroup(this.channelForm, index);
  }

  public addNewCampaignEndsGroup(): void {
    this.campaignChannelsFormService.addNewCampaignEndsGroup(this.channelForm);
  }

  public deleteRewardExpiresGroup(index: number): void {
    this.campaignChannelsFormService.deleteRewardExpiresGroup(this.channelForm, index);
  }

  public addNewRewardExpiresGroup(): void {
    this.campaignChannelsFormService.addNewRewardExpiresGroup(this.channelForm);
  }

  public deleteCampaignEndsGroup(index: number): void {
    this.campaignChannelsFormService.deleteCampaignEndsGroup(this.channelForm, index);
  }

  public addNewNoStampsRewardGroup(): void {
    this.campaignChannelsFormService.addNewNoStampsRewardGroup(this.channelForm);
  }

  public deleteNoStampsRewardGroup(index: number): void {
    this.campaignChannelsFormService.deleteNoStampsRewardGroup(this.channelForm, index);
  }

  public addNewEarnedStampGroup(): void {
    this.campaignChannelsFormService.addNewEarnedStampGroup(this.channelForm);
  }

  public deleteEarnedStampGroup(index: number): void {
    this.campaignChannelsFormService.deleteEarnedStampGroup(this.channelForm, index);
  }

  public addNewEarnedRewardGroup(): void {
    this.campaignChannelsFormService.addNewEarnedRewardGroup(this.channelForm);
  }

  public deleteEarnedRewardGroup(index: number): void {
    this.campaignChannelsFormService.deleteEarnedRewardGroup(this.channelForm, index);
  }

  public getLaunchGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.onCampaignLaunch) as FormArray);
  }

  public getCompletedGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.campaignNotCompleted) as FormArray);
  }

  public getCampaignEndsGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.beforeCampaignEnds) as FormArray);
  }

  public getRewardExpiresGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.beforeRewardExpires) as FormArray);
  }

  public getNoStampsRewardGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.noOfStampsToNextReward) as FormArray);
  }

  public getEarnedStampGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.earnedStamp) as FormArray);
  }

  public getEarnedRewardGroup(): FormArray {
    return (this.channelForm.get(this.notificationsMenu.earnedReward) as FormArray);
  }

  public getWebLink(): FormControl {
    return (this.channelForm.get('webNotification.webLink') as FormControl);
  }

  public getSms(): FormControl {
    return (this.channelForm.get('sms') as FormControl);
  }

  public getShortCodes(): void {
    this.shortCodes = this.campaignChannelsFormService.getShortCodes();
  }

  public triggerWeblink(check: boolean): void {
    const optionControl = this.channelForm.get('webNotification.webLinkOptions');
    check ?
      optionControl
      .patchValue('not_required')
      : optionControl.patchValue('');
  }

  private getStampData(): void {
    this.stampsService.getStampsData()
      .subscribe((response) => {
        this.allStampSlotNumbers = response.slotNumber;
      });
  }

  private subscribeToStore(): void {
    this.store.currentCampaign$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value => {
        this.campaign = value;
        this.cd.markForCheck();
        this.getSlotNumber(this.campaign);
        this.getStampNumbers(this.campaign);
      }));
  }

  private getSlotNumber(campaign: ICampaign): void {
    if (this.checkIsStamp(campaign)) {
      this.stampSlotNumbers =
        this.allStampSlotNumbers.filter((item: CommonSelect) => campaign.template.slots.includes(item.value));
    }
  }

  private getStampNumbers(campaign: ICampaign): void {
    if (this.checkIsStamp(campaign)) {
      this.stampNumbers = Array.from(Array(10).keys(), (item) => {
        return {
          value: item + 1,
          viewValue: `${item + 1}`
      };
      });
    }
  }

  public checkIsStamp(campaign: ICampaign): boolean {
    return campaign && campaign.template && campaign.template.attributes_type === 'stamps';
  }
}
