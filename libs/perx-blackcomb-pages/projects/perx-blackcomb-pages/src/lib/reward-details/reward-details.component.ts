import { Component, OnInit, OnDestroy } from '@angular/core';
import { RewardsService, IReward, IPrice } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss']
})
export class RewardDetailsComponent implements OnInit, OnDestroy {
  public reward$: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;
  private destroy$: Subject<any> = new Subject();
  public descriptionLabel: string = 'Description';
  public tncLabel: string = 'Terms and Conditions';

  constructor(
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.translate.get('POINTS')
      .subscribe((points: string) => {
        this.displayPriceFn = (price: IPrice) => `${price.price} ${points}`;

      });
    this.translate.get('DESCRIPTION')
      .subscribe((desc: string) => {
        this.descriptionLabel = desc;
      });
    this.translate.get('Terms and Conditions')
      .subscribe((tnc: string) => {
        this.tncLabel = tnc;
      });

    this.reward$ = this.activeRoute.params
      .pipe(
        filter((ps: Params) => ps.id),
        map((ps: Params) => Number.parseInt(ps.id, 10)),
        switchMap((id: number) => this.rewardsService.getReward(id)),
        takeUntil(this.destroy$)
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
