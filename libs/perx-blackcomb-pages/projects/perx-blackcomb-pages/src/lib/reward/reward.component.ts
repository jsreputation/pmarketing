import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InstantOutcomeService, IReward, PopupComponent, IOutcome } from '@perx/core';
import { MatDialog } from '@angular/material';
import { map, switchMap, catchError, tap, } from 'rxjs/operators';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public title: string; // = 'Headline'
  public subTitle: string; // = 'Sub-Headline'
  public button: string;
  public background: string;
  public cardBackground: string;
  public rewards$: Observable<IReward[]>;
  public dataPopEmpty: object = {
    title: 'No rewards here',
    text: 'NIL',
    buttonTxt: 'close'
  };

  constructor(
    // private rewardsService: RewardsService,
    private outcomeService: InstantOutcomeService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.rewards$ = this.route.params
      .pipe(
        // filter((params: Params) => params.id),
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.claim(+id)),
        tap((rewards: IReward[]) => {
          if (rewards.length) {
            throw new Error('empty');
          }
        }),
        catchError(() => {
          this.dialog.open(PopupComponent, { data: this.dataPopEmpty });
          /* todo display popup and redirect to wallet*/
          this.router.navigate(['/wallet']);
          return of<IReward[]>([]);
        })
      );
    this.route.params
      .pipe(
        // filter((params: Params) => params.id),
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.getFromCampaign(+id)),
        // filter()
        catchError(() => this.router.navigate(['/wallet']))
      )
      .subscribe((eng: IOutcome) => {
        this.title = eng.title;
        this.subTitle = eng.sub_title;
        this.button = eng.button;
        this.background = eng.background_img_url;
        this.cardBackground = eng.card_background_img_url;
      });
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
