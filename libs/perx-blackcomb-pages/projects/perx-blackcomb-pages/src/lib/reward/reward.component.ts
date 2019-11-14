import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { InstantOutcomeService, IReward, PopupComponent, IOutcome, IPopupConfig } from '@perx/core';
import { MatDialog } from '@angular/material';
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
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) { }

  private initTranslate(): void {
    this.translate.get(this.successPopUp.title).subscribe((text) => this.successPopUp.title = text);
    this.translate.get(this.successPopUp.buttonTxt).subscribe((text) => this.successPopUp.buttonTxt = text);
    this.translate.get(this.noRewardsPopUp.title).subscribe((text) => this.noRewardsPopUp.title = text);
    this.translate.get(this.noRewardsPopUp.text).subscribe((text) => this.noRewardsPopUp.text = text);
    this.translate.get(this.noRewardsPopUp.buttonTxt).subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.getFromCampaign(+id)),
        catchError(() => this.router.navigate(['/wallet']))
      )
      .subscribe((eng: IOutcome) => {
        this.title = eng.title;
        this.subTitle = eng.subTitle;
        this.button = eng.button;
        this.background = eng.backgroundImgUrl;
        this.cardBackground = eng.cardBackgroundImgUrl;
        const { displayProperties } = eng;
        if (displayProperties && displayProperties.noRewardsPopUp) {
          this.noRewardsPopUp.title = displayProperties.noRewardsPopUp.headLine;
          this.noRewardsPopUp.text = displayProperties.noRewardsPopUp.subHeadLine;
          this.noRewardsPopUp.imageUrl = displayProperties.noRewardsPopUp.imageURL || this.noRewardsPopUp.imageUrl;
          this.noRewardsPopUp.buttonTxt = displayProperties.noRewardsPopUp.buttonTxt || this.noRewardsPopUp.buttonTxt;
        }
        if (displayProperties && displayProperties.successPopUp) {
          this.successPopUp.title = displayProperties.successPopUp.headLine;
          this.successPopUp.text = displayProperties.successPopUp.subHeadLine;
          this.successPopUp.imageUrl = displayProperties.successPopUp.imageURL || this.successPopUp.imageUrl;
          this.successPopUp.buttonTxt = displayProperties.successPopUp.buttonTxt || this.successPopUp.buttonTxt;
        }
      });

    this.rewards$ =
      this.route.params
        .pipe(
          // filter((params: Params) => params.id),
          map((params: Params) => params.id),
          switchMap((campaignId: string) => this.outcomeService.claim(+campaignId)),
          tap((rewards: IReward[]) => {
            // if reward list is empty make sure to throw, so that we end up in the catchError block
            if (rewards.length === 0) {
              throw new Error('empty');
            }
          }),
          catchError(() => {
            this.dialog.open(PopupComponent, { data: this.noRewardsPopUp });
            /* todo display popup and redirect to wallet*/
            this.router.navigate(['/wallet']);
            // next line is actually useless as we will redirected.
            return of<IReward[]>([]);
          }),
          takeUntil(this.destroy$)
        );
  }

  public rewardClickedHandler(): void {
    this.router.navigate(['/wallet']);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
