import { RewardsService } from './../../../core/services/rewards.service';
import { CampaignsService, EngagementsService } from '@cl-core/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, of, Observable } from 'rxjs';

@Component({
  selector: 'cl-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss']
})
export class ReviewCampaignComponent implements OnInit, OnDestroy {
  public campaign;

  constructor(
    private store: CampaignCreationStoreService,
    private router: Router,
    private campaignsService: CampaignsService,
    private rewardsService: RewardsService,
    private engagementsService: EngagementsService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.store.currentCampaign$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.campaign = data;
      });
    this.getCampaignData();
  }

  public comeBack(): void {
    this.router.navigateByUrl('/campaigns');
  }

  public ngOnDestroy(): void {
  }
  // TODO: it need for get right data from back end in the future
  private getCampaignData(): void {
    this.route.paramMap
      .pipe(
        untilDestroyed(this),
        switchMap((param: ParamMap) => this.campaignsService.getCampaign(param.get('id'))),
        switchMap(campaign => combineLatest(
          of(campaign),
          this.engagementsService.getEngagement(campaign.engagement_id, campaign.engagement_type),
          this.getRewards(campaign.rewardsList)
        )),
        map(([campaign, engagement, rewardsList]) => ({
          ...campaign,
          template: engagement,
          rewardsList
        }))
      ).subscribe(campaign => {
        this.campaign = campaign;
        this.store.updateCampaign(this.campaign);
      });
  }

  private getRewards(rewardsList: any[]): Observable<IRewardEntityForm[]> {
    if (!rewardsList) {
      return of([]);
    }
    return combineLatest(...rewardsList.map(
      reward => this.rewardsService.getRewardToForm(reward.result_id).pipe(
        map(rewardData => ({ ...rewardData, probability: reward.probability }))
      )
    ));
  }
}
