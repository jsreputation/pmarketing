import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import {
  ConfigService,
  IConfig,
  IStampCard,
  StampService,
  StampState,
  Voucher,
  ICampaignService,
  ICampaign,
  CampaignLandingPage,
  NotificationService
} from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { TranslateService } from '@ngx-translate/core';
import { globalCacheBusterNotifier } from 'ngx-cacheable';

interface IStampCardConfig {
  stampsType: string;
}

@Component({
  selector: 'hangseng-campaign-stamps',
  templateUrl: './campaign-stamps.component.html',
  styleUrls: ['./campaign-stamps.component.scss'],
})
export class CampaignStampsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public stampCards$: Observable<IStampCard[]>;
  public title: string;
  public campaignId: number;
  public subTitle: string;
  public config: CampaignLandingPage | undefined;
  public filter: string[];
  public rewardsHeadline: string;
  public expiryLabelFn: ((v: Voucher) => Observable<string>) | undefined;
  public enableEnrollment: boolean = true;
  public completedStamps: boolean = false;

  public currentPage: number = 0;
  public completed: boolean = false;

  public stampNoteTitle: string;
  public stampNoteDescription: string;
  public stampNoteButtonLabel: string;
  public feExpiryDate: string;
  public feAction: string;
  public feData: string;
  public feReward: string;

  public puzzleTextFn: (puzzle: IStampCard) => Observable<string>;
  public titleFn: (index?: number) => Observable<string>;
  public campaign: ICampaign;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private stampService: StampService,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.configService
      .readAppConfig<IStampCardConfig>()
      .pipe(
        map((config: IConfig<IStampCardConfig>) =>
          oc(config).custom.stampsType('stamp_card')
        ),
        take(1)
      )
      .subscribe((stampsType: string) => {
        if (stampsType === 'stamp_card') {
          this.puzzleTextFn = (puzzle: IStampCard) =>
            !puzzle.stamps ||
            puzzle.stamps.filter((st) => st.state === StampState.issued)
              .length > 1
              ? this.translate.get('STAMP_CAMPAIGN.NEW_STAMPS')
              : this.translate.get('STAMP_CAMPAIGN.NEW_STAMP');
          forkJoin(
            this.translate.get('STAMP_CAMPAIGN.STAMP_CARD'),
            this.translate.get('STAMP_CAMPAIGN.OF')
          ).subscribe((translations) => {
            this.titleFn = (index?: number, totalCount?: number) =>
              of(
                index !== undefined
                  ? `${translations[0]} ${this.cardIndex(index)} ${
                      translations[1]
                    } ${totalCount}`
                  : ''
              );
          });
        }
      });

    this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const campaignId: number = Number.parseInt(id, 10);
          return forkJoin(
            this.stampService.getCards(campaignId),
            this.campaignService.getCampaign(campaignId)
          );
        }),
        switchMap(([stampCards, campaign]: [IStampCard[], ICampaign]) => {
          if (stampCards.length === 0) {
            return this.stampService
              .getCurrentCard(campaign.id)
              .pipe(map((stampCardCurr) => [[stampCardCurr], campaign]));
          }
          return of([stampCards, campaign]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(([stampCards, campaign]: [IStampCard[], ICampaign]) => {
        this.campaign = campaign;
        this.title = campaign.name || 'Stamp cards';
        this.campaignId = campaign.id;
        this.subTitle = campaign.description || '';
        this.config = oc(campaign).displayProperties.landingPage();
        this.stampCards$ = of(stampCards);
        this.translate.get('STAMP_CAMPAIGN.RISK_DISCLAIMER_TITLE').subscribe(txt => this.stampNoteTitle = txt);
        this.stampNoteDescription = campaign.displayProperties.riskDisclaimer;
        this.translate.get('STAMP_CAMPAIGN.READ_MORE_BUTTON_TEXT').subscribe(txt => this.stampNoteButtonLabel = txt);

        this.feExpiryDate = campaign.customFields['f/e_expiry_date'];
        this.feAction = campaign.customFields[`f/e_action_${this.translate.currentLang}`];
        this.feData = campaign.customFields[`f/e_data_${this.translate.currentLang}`];
        this.feReward = campaign.customFields[`f/e_reward_${this.translate.currentLang}`];
      });
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/stamp-card/${puzzle.campaignId}`]);
  }

  private cardIndex(index: number): string {
    if (index < 0) {
      return '';
    }
    return String(++index);
  }

  public onScroll(): void {
    this.currentPage = this.currentPage + 1;
    if (this.completed) {
      return;
    }
  }

  public isEnrolled(): boolean {
    return !this.enableEnrollment || this.campaign?.enrolled;
  }

  public onEnableEnrollment(): void {
    this.campaignService.enrolIntoCampaign(this.campaignId)
    .subscribe((isEnrolled: boolean) => {
      if (isEnrolled) {
        this.enableEnrollment = false;
        globalCacheBusterNotifier.next();
      } else {
        this.notificationService.addSnack('Campaign enrolment failed');
      }
    }, error => {
      this.notificationService.addSnack(error.error.message);
    });
  }

  public onReadMore(): void {
    this.router.navigate([`/stamp/${this.campaignId}/read-more`]);
  }

  public onViewRewards(): void {
    this.router.navigate(['/wallet']);
  }
}
