import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { InstantOutcomeService, IReward, PopupComponent, IOutcome, IPopupConfig } from '@perx/core';
import { MatDialog } from '@angular/material';
import { map, switchMap, catchError, tap, takeUntil, } from 'rxjs/operators';

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
  public dataPopEmpty: IPopupConfig = {
    title: 'We’re sorry, all rewards have been claimed',
    text: 'Look out for more rewards coming your way, soon!',
    buttonTxt: 'Back to Wallet',
  };
  private destroy$: Subject<any> = new Subject();

  constructor(
    private outcomeService: InstantOutcomeService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
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
        if (eng.displayProperties && eng.displayProperties.noRewardsPopUp) {
          this.dataPopEmpty.title = eng.displayProperties.noRewardsPopUp.headLine;
          this.dataPopEmpty.text = eng.displayProperties.noRewardsPopUp.subHeadLine;
          this.dataPopEmpty.imageUrl = eng.displayProperties.noRewardsPopUp.imageURL;
          this.dataPopEmpty.buttonTxt = eng.displayProperties.noRewardsPopUp.buttonTxt;
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
