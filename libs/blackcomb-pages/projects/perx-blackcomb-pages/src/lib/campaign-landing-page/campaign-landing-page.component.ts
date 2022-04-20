import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CampaignLandingPage,
  CampaignOutcomeType,
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IConfig,
  IFlags, IPopupConfig,
  IPrizeSetItem,
  IPrizeSetOutcomeService,
  IReward,
  ITeam,
  ITheme, NotificationService,
  PrizeSetOutcomeType,
  RewardsService,
  SettingsService,
  TeamsService,
  TeamState,
  ThemesService,
} from '@perxtech/core';
import { combineLatest, forkJoin, iif, Observable, of, Subject } from 'rxjs';
import { catchError, filter, flatMap, map, startWith, switchMap, tap, } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-campaign-landing-page',
  templateUrl: './campaign-landing-page.component.html',
  styleUrls: ['./campaign-landing-page.component.scss'],
})
export class CampaignLandingPageComponent implements OnInit, OnDestroy {
  public campaign: ICampaign | undefined;
  public landingPageConfig: CampaignLandingPage | undefined;
  public backgroundUrl: string = '';
  private destroy$: Subject<void> = new Subject();
  public buttonStyle: { [key: string]: string } = {};
  public campaignOutcomes: ICampaignOutcome[];
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;
  public showCampaignOutcomes: boolean = false;
  public isTeamsEnabled: boolean = false;
  public teamCompleted: boolean = false;

  public primaryCtaText: string | undefined = 'Continue';
  public secondaryCtaText: string | undefined;
  public isDisplayCtaBtn: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private themesService: ThemesService,
    private router: Router,
    private prizeSetOutcomeService: IPrizeSetOutcomeService,
    private rewardsService: RewardsService,
    private settingsService: SettingsService,
    private teamsService: TeamsService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    const lang = this.translateService.currentLang || this.translateService.defaultLang;
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
        switchMap(() => this.settingsService.getRemoteFlagsSettings()),
        tap((flags: IFlags) => {
          this.showCampaignOutcomes = flags.showOutcomesOnCampaignLandingPage ? flags.showOutcomesOnCampaignLandingPage : false ;
        }),
        switchMap(() => this.activatedRoute.params),
        filter((params: Params) => params.cid),
        map((params: Params) => Number.parseInt(params.cid, 10)),
        switchMap((campaignId) =>
           forkJoin([
             this.campaignService.getCampaign(campaignId, lang),
             iif(() => this.showCampaignOutcomes,
              this.getCampaignOutcome(campaignId), of([])),
             this.teamsService.getTeam(campaignId).pipe(
               catchError(() => of({})) // let the parent observable carry on when user is not part of team
             )
           ])
        )
      ).subscribe(([ campaign, outcomes, userTeam ]: [ ICampaign, ICampaignOutcome[], ITeam ]) => {
      this.campaign = campaign;
      this.landingPageConfig = oc(campaign).displayProperties.landingPage();
      this.backgroundUrl = oc(this.landingPageConfig).backgroundUrl('');
      this.campaignOutcomes = outcomes;
      this.isTeamsEnabled = !! this.campaign.teamSize && (this.campaign.teamSize > 0);
      if (this.isTeamsEnabled) {
        switch (userTeam.state) {
          case TeamState.completed:
            this.teamCompleted = true;
            break;
          case TeamState.inProgress:
            this.router.navigate([ `teams/pending/${campaign.id}` ], { replaceUrl: true });
            break;
        // do nothing if there's no team state available due to catch error
        }
      }
      this.initCTAs();
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

  public outcomeClicked(outcome: ICampaignOutcome): void {
    if (outcome.type === CampaignOutcomeType.reward) {
      this.router.navigate([ '/reward-detail', outcome.id ], { queryParams:  { previewReward: true } });
    }
    if (outcome.type === CampaignOutcomeType.prizeSet) {
      this.router.navigate([ '/prize-set-outcomes', outcome.id ]);
    }
  }

  public next(): void {
    if (this.campaign) {
      const campaignId = this.campaign.id;
      if (this.campaign.subType === 'quiz') {
        this.router.navigate([`quiz/${this.campaign.id}`]);
        return;
      }
      if (this.campaign.subType === 'survey') {
        this.router.navigate([`survey/${this.campaign.id}`]);
        return;
      }
      if (this.campaign.type === CampaignType.stamp) {
        if (this.isTeamsEnabled) {
          if (this.teamCompleted) {
            this.router.navigate([`stamp/${this.campaign.id}`]);
          } else {
            this.createTeam(this.campaign.id);
          }
          return;
        }
      }
      if (this.campaign.type === CampaignType.instant && !this.campaign.enrolled) {
        this.campaignService.enrolIntoCampaign(campaignId)
          .subscribe(result => {
            if (result) {
              const enrollPopUpConf: IPopupConfig = {
                title: 'You are enrolled!',
                text: `You have until ${this.campaign?.endsAt ? this.campaign?.endsAt.toDateString() : 'All the best!'} to win prize(s). All the best!`,
                buttonTxt: 'Ok',
              };
              this.notificationService.addPopup(enrollPopUpConf);
              this.instantCampaignDisplayCtaBtn(result);
            }
          });
        return;
      }
      this.router.navigate([`${this.campaign.type}/${this.campaign.id}`]);
    }
  }

  public nextSecondary(): void {
    if (this.campaign) {
      if (this.campaign.type === CampaignType.stamp) {
        if (this.campaign.teamSize! > 0) {
          this.router.navigate([`teams/join/${this.campaign.id}`]);
          return;
        }
      }
    }
  }

  private createTeam(campaignId: number): void {
    this.teamsService.createATeamforCampaign(campaignId).subscribe(
      (team: ITeam) => {
        if (team.id) {
          this.router.navigate([`teams/pending/${campaignId}`]);
        }
      }
    );
  }

  private instantCampaignDisplayCtaBtn(isEnrolled: boolean | undefined): void {
    if (!isEnrolled) {
      this.isDisplayCtaBtn = true;
      this.primaryCtaText = 'Enroll';
    } else {
      this.isDisplayCtaBtn = false;
    }
  }

  private initCTAs(): void {
    if (this.campaign?.type === CampaignType.instant) {
      this.instantCampaignDisplayCtaBtn(this.campaign?.enrolled);
    } else {
      this.primaryCtaText = this.landingPageConfig?.buttonText?.text?.length! > 0 ?
        this.landingPageConfig?.buttonText?.text : this.primaryCtaText;
    }
    this.secondaryCtaText = this.landingPageConfig?.buttonText2?.text || undefined;

    if (this.isTeamsEnabled) {
      if (!this.teamCompleted) {
        this.primaryCtaText = this.campaign?.displayProperties?.teamsDetails?.landingPage?.teamIncomplete?.buttonText
        this.secondaryCtaText = this.campaign?.displayProperties?.teamsDetails?.landingPage?.teamIncomplete?.buttonTextSecondary
      } else {
        this.primaryCtaText = this.campaign?.displayProperties?.teamsDetails?.landingPage?.teamComplete?.buttonText;
        this.secondaryCtaText = undefined; // explictly disable the secondary cta button
      }
    }
  }
}
