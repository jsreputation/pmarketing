import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IReward } from '../../rewards/models/reward.model';
import { InstantOutcomeService } from '../../outcome/instant-outcome.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { PopupComponent } from '../../utils/popup/popup.component';
import { IOutcome } from '../../outcome/models/outcome.model';

@Component({
  selector: 'perx-core-reward-page',
  templateUrl: './reward-page.component.html',
  styleUrls: ['./reward-page.component.scss']
})
export class RewardPageComponent implements OnInit {

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
        map((params: Params) => params.id),
        switchMap((id: string) => this.outcomeService.claim(+id)),
        tap((rewards: IReward[]) => {
          if (rewards.length) {
            throw new Error('empty');
          }
        }),
        catchError(() => {
          this.dialog.open(PopupComponent, { data: this.dataPopEmpty });
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
