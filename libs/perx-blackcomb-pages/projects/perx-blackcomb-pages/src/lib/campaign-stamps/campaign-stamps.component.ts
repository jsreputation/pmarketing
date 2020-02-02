import { Component, OnInit } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {IStampCard, StampService, StampState, Voucher} from '@perx/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';

@Component ({
  selector: 'perx-blackcomb-pages-campaign-stamps',
  templateUrl: './campaign-stamps.component.html',
  styleUrls: ['./campaign-stamps.component.scss']
})
export class CampaignStampsComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public stampCards$: Observable<IStampCard[]>;
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
    private stampService: StampService) {
    this.puzzleTextFn = (puzzle: IStampCard) => !puzzle.stamps ||
    puzzle.stamps.filter(st => st.state === StampState.issued).length <= 1 ? 'new stamp' : 'new stamps';
    this.titleFn = (index?: number, totalCount?: number) => index !== undefined ?
      `Stamp Card ${this.cardIndex(index)} out of ${totalCount}` : '';
  }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          const campaignId: number = Number.parseInt(id, 10);
          return this.stampService.getCards(campaignId);
        }),
        takeUntil(this.destroy$)
      ).subscribe(
      (stampCards: IStampCard[]) => {
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
