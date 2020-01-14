import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { AbstractStepWithForm } from '../../step-page-with-form';
import {ICampaign, ICampaignOutcome} from '@cl-core/models/campaign/campaign';
import { oc } from 'ts-optchain';
import {getEngagementRouterLink} from '@cl-helpers/get-engagement-router-link';
import {Router} from '@angular/router';
import { CampaignChannelsLaunchType } from '../../models/campaign-channels-launch-type.enum';
import {AudiencesService} from '@cl-core-services';
import {Subject} from 'rxjs';

@Component({
  selector: 'cl-new-campaign-review-page',
  templateUrl: './new-campaign-review-page.component.html',
  styleUrls: ['./new-campaign-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignReviewPageComponent extends AbstractStepWithForm implements OnInit, OnDestroy {
  @Input() public tenantSettings: ITenantsProperties;
  public pools: any[];
  public stampsHasRewards: boolean = false;
  public launchType: typeof CampaignChannelsLaunchType = CampaignChannelsLaunchType;
  public specialProbDisplay$: Subject<ICampaignOutcome> = new Subject<ICampaignOutcome>();

  constructor(
    public store: CampaignCreationStoreService,
    public audSvc: AudiencesService,
    public cd: ChangeDetectorRef,
    public router: Router
  ) {
    super(0, store, null);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.store.currentCampaign$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ICampaign) => {
        if (data) {
          this.specialProbDisplay$.next(this.checkSpecialProbRemainingSlot(data));
          this.checkStampsHasRewards(data);
        }
      });
    this.audSvc.getAudiencesList()
        .subscribe((data) => {
          this.pools = data;
        });
  }

  public get informationCollectionSettingTitle(): string {
    const informationCollectionSetting = oc(this.campaign).notification.webNotification.webLinkOptions();
    if (informationCollectionSetting) {
      return this.config.informationCollectionSettingTypes.find(types => types.value === informationCollectionSetting).title;
    }
    return '';
  }

  public get slots(): number[] {
    return this.campaign.template.slots || [0];
  }

  public hasRewardsInSlot(slot: number): boolean {
    const slotOutcomes = this.campaign.outcomes.filter(outcomeData => outcomeData.outcome.slotNumber === slot);
    if (slotOutcomes) {
      return slotOutcomes.length > 0;
    }
    return false;
  }

  public checkStampsHasRewards(campaign: ICampaign): void {
    if (!campaign.outcomes) {
      this.stampsHasRewards = false;
    } else {
      campaign.outcomes.forEach(data => {
        if (data.reward) {
          this.stampsHasRewards = true;
        }
      });
    }
    this.cd.detectChanges();
  }

  public checkSpecialProbRemainingSlot(campaign: ICampaign): ICampaignOutcome {
    if (!campaign.outcomes) {return; }
    return campaign.outcomes.find(outcome => outcome.outcome.slotNumber === -1);
  }

  public navigateToEdit(): void {
    const gameType = 'game_type' in this.campaign.template ? this.campaign.template.game_type : null;
    let path = getEngagementRouterLink(this.campaign.engagement_type, gameType);
    path += '/' + this.campaign.template.id;
    this.router.navigate([path]);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cd.detach();
  }
}
