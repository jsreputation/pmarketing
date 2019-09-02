import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
  ICampaign,
  CampaignType,
  IGame,
  GameService,
  CampaignService,
} from '@perx/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent implements OnInit {
  public game$: Observable<IGame>;
  public isEnabled: boolean = false;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private gameService: GameService,
    private campaignService: CampaignService
  ) { }

  public ngOnInit(): void {
    this.game$ = this.campaignService.getCampaigns()
      .pipe(
        map((campaigns: ICampaign[]) => campaigns.filter(camp => camp.type === CampaignType.game)),
        map(campaigns => campaigns[0]),
        switchMap((campaign: ICampaign) => this.gameService.getGamesFromCampaign(campaign.id)),
        map(game => game[0])
      );
    this.actionOnGameStatus();

  }

  public actionOnGameStatus(): void {
    this.game$.subscribe(game => {
      if (game.remainingNumberOfTries <= 0) {
        this.router.navigate(['/wallet']);
      }
    },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public gameCompleted(): void {
    setTimeout(() => {
      this.router.navigate(['/wallet']);
      this.notificationService.addPopup({
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
      });
    }, 2000);
  }
}
