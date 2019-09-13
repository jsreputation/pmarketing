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
  tap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IPlayOutcome } from '@perx/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Observable<Voucher[]>;

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
        map((game: IPlayOutcome) => game.vouchers),
        tap((vouchers: Voucher[]) => this.vouchers = of(vouchers))
      )
      .subscribe(
        () => { },
        () => this.notificationService.addPopup({
          title: 'Oooops!',
          text: 'There is no more reward for you!'
        })
      );
  }
}
