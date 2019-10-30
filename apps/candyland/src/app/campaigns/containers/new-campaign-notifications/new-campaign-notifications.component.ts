import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsMenu } from '../../models/notifications-menu-enum';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';

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
  constructor(private campaignChannelsFormService: CampaignChannelsFormService,
              public store: CampaignCreationStoreService) {}

  public ngOnInit(): void {
    this.getForm();
    this.subscribeFormChanges();
    this.getShortCodes();
    this.store.currentCampaign$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value => {
        this.campaign = value;
        console.log(value);
      }));
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

  private subscribeFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log(value);
      });
  }

  public addNewLaunchGroup(): void {
    this.campaignChannelsFormService.addNewLaunchGroup(this.form);
  }

  public deleteLaunchGroup(index: number): void {
    console.log('deleteLaunchGroup');
    this.campaignChannelsFormService.deleteLaunchGroup(this.form, index);
  }

  public getLaunch(): FormControl {
    return (this.form.get('launch') as FormControl);
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

}
