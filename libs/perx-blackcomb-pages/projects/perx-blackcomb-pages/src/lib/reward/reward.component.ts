import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject, combineLatest, throwError } from 'rxjs';
import {
  InstantOutcomeService,
  IReward,
  IOutcome,
  IPopupConfig,
  IEngagementTransaction,
  RewardsService,
  AuthenticationService,
  PopupComponent
} from '@perx/core';
import { map, switchMap, catchError, tap, takeUntil, mergeMap, } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

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
  private isAnonymousUser: boolean;
  private informationCollectionSetting: string;
  private popupData: IPopupConfig;
  public noRewardsPopUp: IPopupConfig = {
    title: 'INSTANT_OUTCOME_NO_REWARDS_TITLE',
    text: 'INSTANT_OUTCOME_NO_REWARDS_TEXT',
    buttonTxt: 'BACK_TO_WALLET',
    imageUrl: '',
  };
  public successPopUp: IPopupConfig = {
    title: 'REDEEM_SUCCESSFULLY',
    text: '',
    buttonTxt: 'VIEW_REWARD',
    imageUrl: '',
  };

  private destroy$: Subject<any> = new Subject();

  constructor(
    private outcomeService: InstantOutcomeService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private rewardService: RewardsService
  ) { }

  private initTranslate(): void {
    [
      this.successPopUp.title,
      this.successPopUp.buttonTxt,
      this.noRewardsPopUp.title,
      this.noRewardsPopUp.text,
      this.noRewardsPopUp.buttonTxt
    ]
      .filter((k) => k !== undefined && k !== null)
      .forEach((k: string) => {
        this.translate.get(k).subscribe((text: string) => k = text);
      });
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.isAnonymousUser = this.auth.getAnonymous();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.getFromCampaign(parseInt(id, 10))),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.router.navigate(['/wallet']);
          }
          throw err;
        })
      )
      .subscribe(
        (eng: IOutcome) => {
          this.title = eng.title;
          this.subTitle = eng.subTitle;
          this.button = eng.button;
          this.background = eng.backgroundImgUrl;
          this.cardBackground = eng.cardBackgroundImgUrl;
          const { displayProperties } = eng;

          if (displayProperties && displayProperties.informationCollectionSetting) {
            this.informationCollectionSetting = displayProperties.informationCollectionSetting;
          }
          if (displayProperties && displayProperties.noRewardsPopUp) {
            this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine;
            this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine;
            this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
            this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
          }
        },
        () => this.redirectUrlAndPopUp()
      );

    this.transaction$ =
      this.route.params
        .pipe(
          map((params: Params) => params.id),
          switchMap((campaignId: string) => this.outcomeService.prePlay(parseInt(campaignId, 10))),
          tap((outcomeTransaction: IEngagementTransaction) => {
            this.transactionId = outcomeTransaction.id;
          }),
          mergeMap((outcomeTransaction: IEngagementTransaction) => {
            if (!outcomeTransaction.rewardIds || outcomeTransaction.rewardIds.length === 0) {
              return throwError('empty');
            }
            return of(outcomeTransaction);
          }),
          catchError(() => {
            this.popupData = this.noRewardsPopUp;
            this.redirectUrlAndPopUp();
            // next line is actually useless as we will redirected.
            return of({ id: -1 });
          })
        );

    this.rewards$ =
      this.transaction$
        .pipe(
          switchMap(
            (outcomeTransaction: IEngagementTransaction) => {
              if (!outcomeTransaction.rewardIds || outcomeTransaction.rewardIds.length === 0) {
                return of<IReward[]>([]);
              }
              return combineLatest(...outcomeTransaction.rewardIds.map(
                (id: number) => this.rewardService.getReward(id)
              ));
            }
          ),
          takeUntil(this.destroy$)
        );
  }

  public rewardClickedHandler(): void {
    const isCollectDataRequired = !!(this.informationCollectionSetting === 'pi_required' || this.informationCollectionSetting === 'signup_required');
    const userAction$: Observable<void> = isCollectDataRequired || !this.transactionId ?
      of(void 0) :
      this.outcomeService.prePlayConfirm(this.transactionId);

    userAction$.subscribe(
      () => this.redirectUrlAndPopUp(),
      () => this.redirectUrlAndPopUp()
    );
  }

  private redirectUrlAndPopUp(): void {
    const queryParams = {
      popupData: JSON.stringify(this.popupData),
      engagementType: 'instant_outcome',
      transactionId: this.transactionId
    };
    if (this.isAnonymousUser && this.informationCollectionSetting === 'pi_required') {
      this.router.navigate(['/pi'], { queryParams });
    } else if (this.isAnonymousUser && this.informationCollectionSetting === 'signup_required') {
      this.router.navigate(['/signup'], { queryParams });
    } else {
      this.router.navigate(['/wallet']);
      if (this.popupData) {
        this.dialog.open(PopupComponent, { data: this.popupData });
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
