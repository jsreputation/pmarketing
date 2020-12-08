import { Component, OnInit } from '@angular/core';
import { CampaignType, ICampaign, ICampaignService } from '@perxtech/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public invites: CustomInvite[];
  public selectedFilterValue: number;
  constructor(
    protected campaignService: ICampaignService,
    protected campaignInviteService: CampaignInviteService) { }

  public ngOnInit(): void {
    this.selectedFilterValue = -1;
    this.getCampaigns();
  }

  private getCampaigns(inviteId: number = null): void {
    forkJoin(this.campaignService.getCampaigns({ type: CampaignType.invite })
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.map((campaign) => ({ name: campaign.name, value: campaign.id })))),
      this.campaignInviteService.getInvitesById(inviteId)
        .pipe(map((response: IInviteResponse) => response.data))
    ).subscribe(([campaigns, invites]) => {
      this.referralCampaigns = campaigns;
      // map campaign name onto invite list
      this.invites = invites.map((invite: IInvite) => (
        { ...invite, campaignName: this.getCampaignNameFromId(invite.campaign_id, campaigns) }));
    });
  }

  private getCampaignNameFromId(campaignId: number, campaigns: ICampaignListItem[]): string {
    const match = campaigns.find((campaign) => campaign.value === campaignId);
    return match.name;
  }

  public onFilterChange(value: number): void {
    // -1 is 'All' so pass null
    this.getCampaigns(value > 0 ? value : null);
  }
}
