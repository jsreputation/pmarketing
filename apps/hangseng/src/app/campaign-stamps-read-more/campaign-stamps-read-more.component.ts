import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICampaign, ICampaignService } from '@perxtech/core';
import { Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-stamps-read-more',
  templateUrl: './campaign-stamps-read-more.component.html',
  styleUrls: ['./campaign-stamps-read-more.component.scss']
})
export class CampaignStampsReadMoreComponent implements OnInit {
  public description: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private campaignService: ICampaignService) { }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const campaignId: number = Number.parseInt(id, 10);
          return this.campaignService.getCampaign(campaignId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((campaign: ICampaign) => {
        this.description = campaign.displayProperties.riskDisclaimer;
      });
  }

}
