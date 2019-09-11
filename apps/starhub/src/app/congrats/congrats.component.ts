import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  // GameService,
  NotificationService,
  Voucher,
  VoucherState,
  RedemptionType
} from '@perx/core';
import {
  filter,
  map,
  // switchMap
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const mockVoucher: Voucher = {
  id: 2,
  rewardId: 2,
  state: VoucherState.issued,
  name: '10% off a family order of 3 pizzas or more',
  redemptionType: RedemptionType.none,
  thumbnailImg: 'https://picsum.photos/300/200?random=1',
  rewardBanner: 'https://picsum.photos/300/200?random=2',
  merchantImg: 'https://picsum.photos/300/200?random=3',
  merchantName: 'Pizza Hut',
  expiry: null,
  description: [],
  redemptionSuccessTxt: '',
  redemptionSuccessImg: '',
};

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public vouchers: Observable<Voucher[]> = null;

  constructor(
    private activeRoute: ActivatedRoute,
    // private gameService: GameService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.vouchers = of([mockVoucher, mockVoucher, mockVoucher]);
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.gameId),
        map((params: Params) => Number.parseInt(params.gameId, 10)),
        // switchMap((gameId: number) => this.gameService.play(gameId))
      )
      .subscribe(
        (game: any) => console.log(game),
        () => this.notificationService.addPopup({
          title: 'Oooops!',
          text: 'There is no more reward for you!'
        })
      );
  }
}
