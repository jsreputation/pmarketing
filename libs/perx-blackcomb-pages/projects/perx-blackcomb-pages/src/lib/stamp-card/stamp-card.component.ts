import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { StampService, IStampCard } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})

export class StampCardComponent implements OnInit, OnDestroy {
  public title: string; // = 'Scratch & Win!'
  public subTitle: string; //  = 'Collect all 10 stickers and win a reward!'
  public background: string;
  public cardBackground: string;
  public isEnabled: boolean = false;
  public stampCard$: Observable<IStampCard>;
  private destroy$: Subject<any> = new Subject();

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
        takeUntil(this.destroy$)
      );
    this.stampCard$.subscribe(
      (stampCard: IStampCard) => {
        this.title = stampCard.title;
        this.subTitle = stampCard.subTitle;
        this.background = stampCard.displayProperties.bgImage;
        this.cardBackground = stampCard.displayProperties.cardBgImage;
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
