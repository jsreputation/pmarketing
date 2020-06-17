import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { ConfigService, IConfig, IStampCard, StampService, StampState, Voucher, ICampaignService, ICampaign } from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { oc } from 'ts-optchain';

interface IStampCardConfig {
  stampsType: string;
}

@Component({
  selector: 'perx-blackcomb-pages-campaign-stamps',
  templateUrl: './campaign-stamps.component.html',
  styleUrls: ['./campaign-stamps.component.scss']
})
export class CampaignStampsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public stampCards$: Observable<IStampCard[]>;
  public title: string;
  public subTitle: string;
  public howToCollectStamps: string;
  public filter: string[];
  public rewardsHeadline: string;
  public expiryLabelFn: ((v: Voucher) => string) | undefined;

  public currentPage: number = 0;
  public completed: boolean = false;

  // public stampsType: string;
  public puzzleTextFn: (puzzle: IStampCard) => string;
  public titleFn: (index?: number) => string;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private stampService: StampService,
    private campaignService: ICampaignService,
    private configService: ConfigService) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStampCardConfig>().pipe(
      map((config: IConfig<IStampCardConfig>) => oc(config).custom.stampsType('stamp_card')),
      take(1)
    ).subscribe((stampsType: string) => {
      if (stampsType === 'stamp_card') {
        this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
          puzzle.stamps.filter(st => st.state === StampState.issued).length > 1 ? 'new stamps' : 'new stamp';
        this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
          `Stamp Card ${this.cardIndex(index)} out of ${totalCount}` : '';
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
      takeUntil(this.destroy$)
    ).subscribe(
      ([stampCards, campaign]: [IStampCard[], ICampaign]) => {
        this.title = campaign.name || 'Stamp cards';
        this.subTitle = campaign.description || '';
        this.howToCollectStamps = oc(campaign).displayProperties.howToCollectStamps() || '';
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
