import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  IGameService,
  NotificationService,
  Voucher
} from '@perx/core';
import {
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { IPlayOutcome } from '@perx/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Voucher[];

  constructor(
    private activeRoute: ActivatedRoute,
    private gameService: IGameService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.gameId),
        map((params: Params) => Number.parseInt(params.gameId, 10)),
        switchMap((gameId: number) => this.gameService.play(gameId)),
        map((game: IPlayOutcome) => game.vouchers)
      )
      .subscribe(
        (vouchers: Voucher[]) => {
          this.vouchers = vouchers;
          if (this.vouchers.length === 0) {
            this.showNoRewardsPopUp();
          }
         },
        () => this.showNoRewardsPopUp()
      );
  }

  private showNoRewardsPopUp(): void {

    this.notificationService.addPopup({
          title: 'Oh snap, you didn’t win.',
          text: 'You can play the game till 20 Oct.'
        });
  }
}
