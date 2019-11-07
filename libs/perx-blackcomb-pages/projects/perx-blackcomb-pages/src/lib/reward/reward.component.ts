import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { InstantOutcomeService, IReward, IOutcome, IPopupConfig, IEngagementTransaction, RewardsService, ITransaction } from '@perx/core';
import { map, switchMap, catchError, tap, takeUntil, } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit, OnDestroy {
  public title: string; // = 'Headline'
  public subTitle: string; // = 'Sub-Headline'
  public button: string;
  public background: string;
  public cardBackground: string;
  public rewards$: Observable<IReward[]>;
  public transaction$: Observable<IEngagementTransaction>;
  private transactionId: number | null = null;
  public noRewardsPopUp: IPopupConfig = {
    title: 'We’re sorry, all rewards have been claimed',
    text: 'Look out for more rewards coming your way, soon!',
    buttonTxt: 'Back to Wallet',
    imageUrl: '',
  };

  private destroy$: Subject<any> = new Subject();

  constructor(
    private outcomeService: InstantOutcomeService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private rewardService: RewardsService
  ) { }

  private initTranslate(): void {
    this.translate.get('BACK_TO_WALLET').subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.getFromCampaign(parseInt(id, 10))),
        catchError(() => this.router.navigate(['/pi'],
          {
            queryParams: { engagementType: 'instant_outcome', transactionId: this.transactionId }
          }
        ))
      )
      .subscribe((eng: IOutcome) => {
        this.title = eng.title;
        this.subTitle = eng.sub_title;
        this.button = eng.button;
        this.background = eng.background_img_url;
        this.cardBackground = eng.card_background_img_url;
        const { displayProperties } = eng;
        if (displayProperties && displayProperties.noRewardsPopUp) {
          this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine || this.noRewardsPopUp.title;
          this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine || this.noRewardsPopUp.text;
          this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
          this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
        }
      });

    this.transaction$ =
      this.route.params
        .pipe(
          map((params: Params) => params.id),
          switchMap((campaignId: string) => this.outcomeService.prePlay(parseInt(campaignId, 10))),
          tap((outcomeTransaction: IEngagementTransaction) => {
            this.transactionId = outcomeTransaction.id;
            if (outcomeTransaction.voucherIds.length === 0) {
              throw new Error('empty');
            }
          }),
          catchError(() => {
            this.router.navigate(['/pi'],
              {
                queryParams:
                {
                  popupData: this.noRewardsPopUp,
                  engagementType: 'instant_outcome',
                  transactionId: this.transactionId
                }
              });
            // next line is actually useless as we will redirected.
            return of<IEngagementTransaction>({
              rewardIds: [],
              id: null
            });
          })
        );

    this.rewards$ =
      this.transaction$
        .pipe(
          switchMap(
            (outcomeTransaction: IEngagementTransaction) => {
              if (outcomeTransaction.rewardIds.length === 0) {
                return of<IReward[]>([]);
              }
              return combineLatest(...outcomeTransaction.voucherIds.map(
                (id: number) => this.rewardService.getReward(id)
              ));
            }
          ),
          takeUntil(this.destroy$)
        );
  }

  public rewardClickedHandler(): void {
    this.router.navigate(['/pi'], {
      queryParams: { engagementType: 'instant_outcome', transactionId: this.transactionId }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
