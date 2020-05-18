import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CampaignLandingPage, ICampaign, ICampaignService } from '@perxtech/core';
import { Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-campaign-landing-page',
  templateUrl: './campaign-landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./campaign-landing-page.component.scss']
})
export class CampaignLandingPageComponent implements OnInit, OnDestroy {
  public campaign: ICampaign | undefined;
  public config: CampaignLandingPage | undefined;
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
        filter((params: Params) => params.cid),
        map((params: Params) => Number.parseInt(params.cid, 10)),
        switchMap((id) => this.campaignService.getCampaign(id))
      )
      .subscribe((campaign) => {
        this.campaign = campaign;
        this.config = oc(campaign).displayProperties.landingPage();
        this.backgroundUrl = oc(this.config).backgroundUrl('');
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public next(): void {
    if (this.campaign) {
      if (this.campaign.subType === 'quiz') {
        this.router.navigate([`quiz/${this.campaign.id}`]);
        return;
      }

      this.router.navigate([`${this.campaign.type}/${this.campaign.id}`]);
    }
  }
}
