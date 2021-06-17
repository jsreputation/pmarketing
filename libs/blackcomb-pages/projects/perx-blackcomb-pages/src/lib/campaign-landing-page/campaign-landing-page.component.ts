import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  CampaignLandingPage,
  CampaignOutcomeType,
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IConfig,
  IPrizeSetItem,
  IPrizeSetOutcomeService,
  IReward,
  ITheme,
  PrizeSetOutcomeType,
  RewardsService,
  ThemesService
} from '@perxtech/core';
import { combineLatest, forkJoin, Observable, of, Subject, } from 'rxjs';
import { catchError, filter, flatMap, map, startWith, switchMap, tap, } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-campaign-landing-page',
  templateUrl: './campaign-landing-page.component.html',
  styleUrls: ['./campaign-landing-page.component.scss'],
})
export class CampaignLandingPageComponent implements OnInit, OnDestroy {
  public campaign: ICampaign | undefined;
  public config: CampaignLandingPage | undefined;
  public backgroundUrl: string = '';
  private destroy$: Subject<void> = new Subject();
  public buttonStyle: { [key: string]: string } = {};
  public campaignOutcomes: ICampaignOutcome[];
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private themesService: ThemesService,
    private router: Router,
    private prizeSetOutcomeService: IPrizeSetOutcomeService,
    private rewardsService: RewardsService
  ) {}

  public ngOnInit(): void {

    this.configService
      .readAppConfig<ITheme>()
      .pipe(
        flatMap((config: IConfig<ITheme>) =>
          this.themesService.getThemeSetting(config)
        ),
        tap((theme: ITheme) => {
          this.buttonStyle['background-color'] = theme.properties[
            '--button_background_color'
          ]
            ? theme.properties['--button_background_color']
            : '';
          this.buttonStyle.color = theme.properties['--button_text_color']
            ? theme.properties['--button_text_color']
            : '';
        }),
        switchMap(() => this.activatedRoute.params),
        filter((params: Params) => params.cid),
        map((params: Params) => Number.parseInt(params.cid, 10)),
        switchMap((campaignId) =>
           forkJoin(
            [this.campaignService.getCampaign(campaignId), this.getCampaignOutcome(campaignId)])
        )
      ).subscribe(([campaign, outcomes]: [ICampaign, ICampaignOutcome[]]) => {
        this.campaign = campaign;
        this.config = oc(campaign).displayProperties.landingPage();
        this.backgroundUrl = oc(this.config).backgroundUrl('');
        this.campaignOutcomes = outcomes;
      });
  }

  public getCampaignOutcome(campaignId: number): Observable<ICampaignOutcome[]> {
    let prizeSetOutcomes: ICampaignOutcome[] = [];
    let allOutcomes: ICampaignOutcome[] = [];
    return this.campaignService.getCampaignOutcomes(campaignId).pipe(
     switchMap((outcomes: ICampaignOutcome[]) => {
        this.campaignOutcomes = outcomes;
        allOutcomes = outcomes;
        prizeSetOutcomes = outcomes && outcomes.filter((outcome) => outcome.type === CampaignOutcomeType.prizeSet);
        return  prizeSetOutcomes && prizeSetOutcomes.length > 0 ?
                forkJoin([...prizeSetOutcomes.map((outcome) => this.getPrizeSetOutcome(outcome.id))]) : of([]);
      }),
      map(
        (prizeSets: IPrizeSetItem[][]) =>
          [].concat(...(prizeSets as [])) as IPrizeSetItem[]
      ),
      switchMap((prizeSetItems) => {
          allOutcomes.map((outcome) => {
            if (outcome.type === CampaignOutcomeType.prizeSet) {
               const items = prizeSetItems && prizeSetItems.filter(prizeSetItem => prizeSetItem?.prizeSetId === outcome.id);
               items?.map((item) => {
                if (item.campaignPrizeType === PrizeSetOutcomeType.reward && item?.rewardDetails?.name) {
                  if (outcome.prizeSetItems) {
                    outcome.prizeSetItems?.push(item?.rewardDetails?.name);
                  } else {
                    outcome.prizeSetItems = [item?.rewardDetails?.name];
                  }
                 }  else if (item.campaignPrizeType === PrizeSetOutcomeType.points && item?.pointsCount) {
                    const title = `${item.pointsCount} loyalty points`;
                    if (outcome.prizeSetItems) {
                      outcome.prizeSetItems?.push(title);
                    } else {
                      outcome.prizeSetItems = [title];
                    }
                 }
                });
            }
          });
          return of(allOutcomes);
      }));
  }

  public getPrizeSetOutcome(prizeSetId: number): Observable<IPrizeSetItem[]> {
    let rewardOutcomes: IPrizeSetItem[] = [];
    let allOutcomes: IPrizeSetItem[] = [];
    return this.prizeSetOutcomeService.getPrizeSetDetails(prizeSetId).pipe(
      switchMap((prizeSet) => {
        allOutcomes = prizeSet && prizeSet.outcomes;
        prizeSet.outcomes.forEach(outcome => outcome.prizeSetId = prizeSet.id);
        rewardOutcomes = allOutcomes.filter((outcome) => outcome.campaignPrizeType === PrizeSetOutcomeType.reward);
        return forkJoin([
          combineLatest([...rewardOutcomes.map((outcome) => this.rewardsService.getReward(outcome.campaignPrizeId)
          .pipe(catchError(() => of([]))))]).pipe(startWith([]))]);
      }),
      switchMap(([rewards]: ([IReward[]])) => {
          allOutcomes.map((outcome) => {
            if (outcome.campaignPrizeType === PrizeSetOutcomeType.reward) {
              outcome.rewardDetails = rewards && rewards.find(reward => reward?.id === outcome.campaignPrizeId);
            }
          });
          return of(allOutcomes);
      }));
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
      if (this.campaign.subType === 'survey') {
        this.router.navigate([`survey/${this.campaign.id}`]);
        return;
      }
      if (this.campaign.type === CampaignType.stamp) {
        if (!this.campaign.teamSize || !(this.campaign.teamSize > 0)) {
          // this.router.navigate([`teams/create/${this.campaign.id}`]);
          this.router.navigate([`teams/create`]);
          return;
        }
      }
      this.router.navigate([`${this.campaign.type}/${this.campaign.id}`]);
    }
  }

  public nextSecondary(): void {
    if (this.campaign) {
      if (this.campaign.type === CampaignType.stamp) {
        if (! this.campaign.teamSize || ! (this.campaign.teamSize > 0)) {
          // this.router.navigate([`teams/join/${this.campaign.id}`]);
          this.router.navigate([ `teams/join` ]);
          return;
        }
      }
    }
  }
}
