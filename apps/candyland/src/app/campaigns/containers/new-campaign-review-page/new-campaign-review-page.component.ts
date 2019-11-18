import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import { ICampaign } from '@cl-core/models/campaign/campaign.interface';
import { oc } from 'ts-optchain';

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
    public cd: ChangeDetectorRef
  ) {
    super(0, store, null);
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

  public get informationCollectionSettingTitle(): string {
    const informationCollectionSetting = oc(this.campaign).campaignInfo.informationCollectionSetting;
    if (informationCollectionSetting) {
      return this.config.informationCollectionSettingTypes.find(types => types.value === informationCollectionSetting).title;
    }
    return '';
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
    this.cd.detectChanges();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }
}
