import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../category.model';
import { Router } from '@angular/router';
import { IReward, ICatalog, SettingsService, IFlags, ICampaign, CampaignType, ITaggedItem, ConfigService, IConfig } from '@perxtech/core';
import { AnalyticsService, PageType } from '../../analytics.service';
import { IStarhubConfig } from '../home/home.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public showStampCampaigns: boolean;
  public showAllSnappingSaturdayItems: boolean;

  constructor(
    private router: Router,
    private analytics: AnalyticsService,
    private settingService: SettingsService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.analytics.addEvent({
      pageName: 'rewards:discover',
      pageType: PageType.landingPage,
      siteSectionLevel2: 'rewards:discover',
      siteSectionLevel3: 'rewards:discover'
    });
    this.settingService.getRemoteFlagsSettings()
      .subscribe((flags: IFlags) => this.showStampCampaigns = flags && flags.showStampCampaigns || false);
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (config: IConfig<IStarhubConfig>) => {
      this.showAllSnappingSaturdayItems = config.custom ? config.custom.showAllSnappingSaturdayItems : false; });
    }

  public categorySelected(category: ICategory): void {
    this.router.navigate(['/category'], { queryParams: { category: category.name } });
  }

  public rewardSelected(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }

  public catalogSelected(catalog: ICatalog): void {
    this.router.navigate(['/category'], { queryParams: { catalog: catalog.id } });
  }

  public campaignSelected(gameId: number): void {
    this.router.navigate(['/game'], { queryParams: { id: gameId } });
  }

  public sqCampaignSelected(campaignId: number): void {
    this.router.navigate([`campaign-welcome/${campaignId}`]);
  }

  public stampSelected(campaignId: number): void {
    this.router.navigate([`/stamp/${campaignId}`]);
  }

  public taggedItemSelected(taggedItem: ITaggedItem): void {

    switch (taggedItem.itemType) {
      case 'reward': {
         this.rewardSelected(<IReward> taggedItem.itemVal);
         break;
      }
      case CampaignType.stamp: {
        this.stampSelected((<ICampaign> taggedItem.itemVal).id);
        break;
      }
      case CampaignType.game: {
        this.campaignSelected(<number> taggedItem.itemVal);
        break;
      }
      case CampaignType.survey: {
        this.sqCampaignSelected((<ICampaign> taggedItem.itemVal).id);
        break;
      }
      default: {
        this.sqCampaignSelected((<ICampaign> taggedItem.itemVal).id);
        break;
     }
    }
  }
}

