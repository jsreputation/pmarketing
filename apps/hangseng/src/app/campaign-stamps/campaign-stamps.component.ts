import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { ConfigService, IConfig, IStampCard, StampService, StampState, Voucher, ICampaignService, ICampaign, CampaignLandingPage } from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { TranslateService } from '@ngx-translate/core';

interface IStampCardConfig {
  stampsType: string;
}

@Component({
  selector: 'hangseng-campaign-stamps',
  templateUrl: './campaign-stamps.component.html',
  styleUrls: ['./campaign-stamps.component.scss']
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

  public currentPage: number = 0;
  public completed: boolean = false;

  // public stampsType: string;
  public puzzleTextFn: (puzzle: IStampCard) => Observable<string>;
  public titleFn: (index?: number) => Observable<string>;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private stampService: StampService,
    private campaignService: ICampaignService,
    private configService: ConfigService,
    private translate: TranslateService) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStampCardConfig>().pipe(
      map((config: IConfig<IStampCardConfig>) => oc(config).custom.stampsType('stamp_card')),
      take(1)
    ).subscribe((stampsType: string) => {
      if (stampsType === 'stamp_card') {
        this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
          puzzle.stamps.filter(st => st.state === StampState.issued).length > 1 ?
          this.translate.get('STAMP_CAMPAIGN.NEW_STAMPS') : this.translate.get('STAMP_CAMPAIGN.NEW_STAMP');
        forkJoin(this.translate.get('STAMP_CAMPAIGN.STAMP_CARD'), this.translate.get('STAMP_CAMPAIGN.OF'))
          .subscribe((translations) => {
            this.titleFn = (index?: number, totalCount?: number) => of(index !== undefined ?
              `${translations[0]} ${this.cardIndex(index)} ${translations[1]} ${totalCount}` : '');
          });
      }
    });

    this.activeRoute.paramMap.pipe(
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
          return this.stampService.getCurrentCard(campaign.id).pipe(
            map((stampCardCurr) => [[stampCardCurr], campaign])
          );
        }
        return of([stampCards, campaign]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      ([stampCards, campaign]: [IStampCard[], ICampaign]) => {
        this.title = campaign.name || 'Stamp cards';
        this.campaignId = campaign.id;
        this.subTitle = campaign.description || '';
        this.config = oc(campaign).displayProperties.landingPage();
        this.stampCards$ = of(stampCards);
      }
    );
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

}
