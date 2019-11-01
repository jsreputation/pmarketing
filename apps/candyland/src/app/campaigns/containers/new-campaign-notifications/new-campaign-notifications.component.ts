import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { StampsService } from '@cl-core-services';

@Component({
  selector: 'cl-new-campaign-notifications',
  templateUrl: './new-campaign-notifications.component.html',
  styleUrls: ['./new-campaign-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignNotificationsComponent implements OnInit, OnDestroy {
  public notificationsMenu: typeof NotificationsMenu = NotificationsMenu;
  public selectedMenu: string = NotificationsMenu.onCampaignLaunch;
  public form: FormGroup;
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
    this.getForm();
    this.getShortCodes();
    this.getStampData();
    this.subscribeToStore();
  }

  public patchForm(value: any): void {
    this.campaignChannelsFormService.patchForm(this.form, value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectMenu(currentItem: string): void {
    this.selectedMenu = currentItem;
  }

  private getForm(): void {
    this.form = this.campaignChannelsFormService.getForm();
  }

  public addNewLaunchGroup(): void {
    this.campaignChannelsFormService.addNewLaunchGroup(this.form);
  }

  public deleteLaunchGroup(index: number): void {
    this.campaignChannelsFormService.deleteLaunchGroup(this.form, index);
  }

  public addNewCompletedGroup(): void {
    this.campaignChannelsFormService.addNewCompletedGroup(this.form);
  }

  public deleteCompletedGroup(index: number): void {
    this.campaignChannelsFormService.deleteCompletedGroup(this.form, index);
  }

  public addNewCampaignEndsGroup(): void {
    this.campaignChannelsFormService.addNewCampaignEndsGroup(this.form);
  }

  public deleteRewardExpiresGroup(index: number): void {
    this.campaignChannelsFormService.deleteRewardExpiresGroup(this.form, index);
  }

  public addNewRewardExpiresGroup(): void {
    this.campaignChannelsFormService.addNewRewardExpiresGroup(this.form);
  }

  public deleteCampaignEndsGroup(index: number): void {
    this.campaignChannelsFormService.deleteCampaignEndsGroup(this.form, index);
  }

  public addNewNoStampsRewardGroup(): void {
    this.campaignChannelsFormService.addNewNoStampsRewardGroup(this.form);
  }

  public deleteNoStampsRewardGroup(index: number): void {
    this.campaignChannelsFormService.deleteNoStampsRewardGroup(this.form, index);
  }

  public addNewEarnedStampGroup(): void {
    this.campaignChannelsFormService.addNewEarnedStampGroup(this.form);
  }

  public deleteEarnedStampGroup(index: number): void {
    this.campaignChannelsFormService.deleteEarnedStampGroup(this.form, index);
  }

  public addNewEarnedRewardGroup(): void {
    this.campaignChannelsFormService.addNewEarnedRewardGroup(this.form);
  }

  public deleteEarnedRewardGroup(index: number): void {
    this.campaignChannelsFormService.deleteEarnedRewardGroup(this.form, index);
  }

  public getLaunchGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.onCampaignLaunch) as FormArray);
  }

  public getCompletedGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.campaignNotCompleted) as FormArray);
  }

  public getCampaignEndsGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.beforeCampaignEnds) as FormArray);
  }

  public getRewardExpiresGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.beforeRewardExpires) as FormArray);
  }

  public getNoStampsRewardGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.noOfStampsToNextReward) as FormArray);
  }

  public getEarnedStampGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.earnedStamp) as FormArray);
  }

  public getEarnedRewardGroup(): FormArray {
    return (this.form.get(this.notificationsMenu.earnedReward) as FormArray);
  }

  public getWebLink(): FormControl {
    return (this.form.get('webLink') as FormControl);
  }

  public getSms(): FormControl {
    return (this.form.get('sms') as FormControl);
  }

  public getShortCodes(): void {
    this.shortCodes = this.campaignChannelsFormService.getShortCodes();
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
