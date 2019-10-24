import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { SettingsService } from '@cl-core-services';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';

@Component({
  selector: 'cl-new-campaign-review-page',
  templateUrl: './new-campaign-review-page.component.html',
  styleUrls: ['./new-campaign-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignReviewPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;

  public stampsHasRewards: boolean = false;

  constructor(
    public store: CampaignCreationStoreService,
    public cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
    super(0, store, null, cd);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICampaign) => {
        this.checkStampsHasRewards(data);
      });
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  public checkStampsHasRewards(campaign: ICampaign): void {
    if (!campaign.rewardsListCollection) {
      this.stampsHasRewards = false;
    } else {
      campaign.rewardsListCollection.forEach(data => {
        if (data.rewardsOptions.rewards && data.rewardsOptions.rewards.length > 0) {
          this.stampsHasRewards = true;
        }
      });
    }
    if (this.stampsHasRewards) {
      this.cd.detectChanges();
    }
    this.getTenants();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }
}
