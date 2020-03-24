import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICampaign, ICampaignService } from '@perxtech/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-campaign-landing-page',
  templateUrl: './campaign-landing-page.component.html',
  styleUrls: ['./campaign-landing-page.component.scss']
})
export class CampaignLandingPageComponent implements OnInit, OnDestroy {
  public campaign: ICampaign | undefined;
  public backgroundUrl: string = '';
  private destroy$: Subject<void> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => params.id),
        map((params: Params) => Number.parseInt(params.id, 10)),
        switchMap((id) => this.campaignService.getCampaign(id))
      )
      .subscribe((c) => {
        this.backgroundUrl = c.campaignBannerUrl || '';
        this.campaign = c;
        console.log(c);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public next(): void {
    if (this.campaign) {
      this.router.navigate([`${this.campaign.type}/${this.campaign.id}`]);
    }
  }
}
