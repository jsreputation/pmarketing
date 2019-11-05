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
    title: 'We’re sorry, all rewards have been claimed',
    text: 'Look out for more rewards coming your way, soon!',
    buttonTxt: 'Back to Wallet',
  };
  public rewardSuccessPopUp: IPopupConfig = {
    buttonTxt: 'View Reward',
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
    this.translate.get('VIEW_REWARD').subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
    this.translate.get('BACK_TO_WALLET').subscribe((text) => this.noRewardsPopUp.buttonTxt = text);
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
        if (displayProperties && displayProperties.rewardSuccessPopUp) {
          this.rewardSuccessPopUp.title = displayProperties.rewardSuccessPopUp.headLine || this.rewardSuccessPopUp.title;
          this.rewardSuccessPopUp.text = displayProperties.rewardSuccessPopUp.subHeadLine || this.rewardSuccessPopUp.text;
          this.rewardSuccessPopUp.imageUrl = displayProperties.rewardSuccessPopUp.imageURL || this.rewardSuccessPopUp.imageUrl;
          this.rewardSuccessPopUp.buttonTxt = displayProperties.rewardSuccessPopUp.buttonTxt || this.rewardSuccessPopUp.buttonTxt;
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
            this.dialog.open(PopupComponent, { data: this.dataPopEmpty });
            /* todo display popup and redirect to wallet*/
            this.router.navigate(['/wallet']);
            // next line is actually useless as we will redirected.
            return of<IReward[]>([]);
          }),
          takeUntil(this.destroy$)
        );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public rewardClickedHandler(reward: IReward): void {
    const data = {
      title: 'Clicked!',
      text: 'ID: ' + reward.id + '\n' +
        'Reward Name: ' + reward.name,
    };
    this.dialog.open(PopupComponent, { data });
  }
}
