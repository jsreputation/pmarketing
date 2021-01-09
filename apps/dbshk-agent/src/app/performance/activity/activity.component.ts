import { Component, OnInit } from '@angular/core';
import { CampaignType, ICampaign, ICampaignService } from '@perxtech/core';
import { forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CampaignInviteService } from '../../campaign-referrals/campaign-invite.service';
import { IInvite, IInviteResponse } from '../../campaign-referrals/models/campaign-referral.model';

interface CustomInvite extends IInvite {
  campaignName: string;
}

interface ICampaignListItem { name: string; value: number; }

@Component({
  selector: 'dbshk-agent-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  public referralCampaigns: ICampaignListItem[];
  public invites: CustomInvite[] = [];
  public selectedFilterValue: string | number;
  public defaultFilterValue: string;
  public isLastPage: boolean = false;
  private pageNumber: number = 1;
  private pageSize: number = 25;

  constructor(
    protected campaignService: ICampaignService,
    protected campaignInviteService: CampaignInviteService) { }

  public ngOnInit(): void {
    this.defaultFilterValue = 'all';
    this.selectedFilterValue = 'all';
    this.getCampaigns();
  }

  private getCampaigns(): void {
    forkJoin(this.campaignService.getCampaigns({ type: CampaignType.invite })
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.map((campaign) => ({ name: campaign.name, value: campaign.id })))),
      // -1 filter val is 'All' so pass null as campaign ID
      this.campaignInviteService.getInvitesByCampaignId(
        this.selectedFilterValue === 'all' ? null : this.selectedFilterValue.toString(),
        this.pageNumber,
        this.pageSize)
        .pipe(
          tap((response: IInviteResponse) => this.isLastPage = response.meta.total_pages === this.pageNumber),
          map((response: IInviteResponse) => response.data))
    ).subscribe(([campaigns, invites]) => {
      this.referralCampaigns = campaigns;
      // map campaign name onto invite list
      const newInvites = invites.map((invite: IInvite) => (
        { ...invite, campaignName: this.getCampaignNameFromId(invite.campaign_id, campaigns) }));
      // combine previous invites with new to create one array
      this.invites = [...this.invites, ...newInvites];
    });
  }

  private getCampaignNameFromId(campaignId: number, campaigns: ICampaignListItem[]): string {
    const match = campaigns.find((campaign) => campaign.value === campaignId);
    return match.name;
  }

  public onFilterChange(value: string): void {
    // clear existing list, filters and page data since we are about to build a fresh list
    this.invites = [];
    this.isLastPage = false;
    this.pageNumber = 1;
    this.selectedFilterValue = value;
    this.getCampaigns();
  }

  public onScroll(): void {
    if (this.isLastPage) {
      return;
    }
    this.pageNumber++;
    this.getCampaigns();
  }
}
