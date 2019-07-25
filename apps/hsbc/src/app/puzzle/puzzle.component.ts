import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CAMPAIGN_TYPE,
  CampaignService,
  StampService,
  ICampaign,
  IStampCard,
  STAMP_CARD_STATE,
  STAMP_STATE,
  NotificationService,
  IStamp
} from '@perx/core/dist/perx-core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SoundService } from '../sound/sound.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit, OnDestroy {
  campaignId: number = null;
  private cardId: number = null;
  private card: IStampCard = null;
  availablePieces = 0;
  playedPieces = 0;
  totalAvailablePieces = 0;
  rows = 2;
  cols = 3;
  image = '';
  private cardsCount = 0;

  constructor(
    private campaignService: CampaignService,
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private soundService: SoundService
  ) {
  }

  ngOnInit() {
    const campaignIdStr = this.route.snapshot.paramMap.get('campaignId');
    if (campaignIdStr !== null && campaignIdStr !== '') {
      this.campaignId = Number.parseInt(campaignIdStr, 10);
    }

    const cardIdStr = this.route.snapshot.paramMap.get('cardId');
    if (cardIdStr !== null && cardIdStr !== '') {
      this.cardId = Number.parseInt(cardIdStr, 10);
    }

    if (this.campaignId === null) {
      this.fetchCampaign();
    } else {
      if (this.cardId === null || this.card === null) {
        this.fetchCard();
        this.fetchStampTransactionCount();
        this.fetchCardsCount();
      }
    }

    if (!localStorage.getItem('enableSound')) {
      setTimeout(() => {
        this.soundService.showPopup();
      }, 50);
    } else if (localStorage.getItem('enableSound') === 'true') {
      setTimeout(() => {
        this.soundService.play();
      }, 50);
    }
  }

  ngOnDestroy() {
    this.soundService.pause(false);
  }

  private fetchCampaign() {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchStampTransactionCount();
        this.fetchCard();
        this.fetchCardsCount();
      });
  }

  private fetchCard() {
    this.stampService.getCurrentCard(this.campaignId)
      .subscribe((card: IStampCard) => {
        this.cardId = card.id;
        this.card = card;
        this.cols = card.displayProperties.numberOfCols;
        this.rows = card.displayProperties.numberOfRows;
        this.playedPieces = card.stamps.filter(stamp => stamp.state === STAMP_STATE.redeemed).length;
        const availablePieces = card.stamps.filter(stamp => stamp.state === STAMP_STATE.issued).length;
        this.availablePieces = Math.min(this.rows * this.cols - this.playedPieces, availablePieces);
        this.image = card.displayProperties.cardImage.value.imageUrl;
        if (this.availablePieces === 0 && card.state === STAMP_CARD_STATE.inactive) {
          this.notificationService.addPopup({
            title: 'Thank you!',
            text: 'Unfortunately, you have no pieces available.'
          });
          this.router.navigate(['/home']);
        }

      });
  }

  private fetchCardsCount() {
    if (this.campaignId === null) {
      return;
    }
    this.stampService.getCards(this.campaignId)
      .subscribe(
        (cards: IStampCard[]) => { this.cardsCount = cards.length; },
        () => { }
      );
  }

  private fetchStampTransactionCount() {
    this.stampService.getStamps(this.campaignId)
      .subscribe((stamps: IStamp[]) => {
        this.totalAvailablePieces = stamps.filter(stamp => stamp.state === STAMP_STATE.issued).length;
      });
  }

  onMoved() {
    const stamps = this.card.stamps.filter(s => s.state === STAMP_STATE.issued);
    if (stamps.length === 0) {
      // don't do anything
      return;
    }
    const firstAvailableStamp = stamps[0];
    this.stampService.putStamp(firstAvailableStamp.id)
      .subscribe(
        (stamp: IStamp) => {
          if (stamp.state === STAMP_STATE.redeemed) {
            if (this.card.cardNumber === this.cardsCount) { // we are on the last card
              const redeemedTransactionsCount = this.card.stamps.filter(s => s.state === STAMP_STATE.redeemed).length;
              if (redeemedTransactionsCount === this.rows * this.cols) { // we also were on the last stamp
                this.notificationService.addPopup({
                  // tslint:disable-next-line: max-line-length
                  text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
                });
              }
            }

            if (stamp.vouchers && stamp.vouchers.length > 0) {
              const voucherId = stamp.vouchers[0].id;
              this.router.navigate([`/voucher/${voucherId}`, { win: true }]);
            }
          } else {
            const issuedLeft = this.card.stamps.filter(s => s.state === STAMP_STATE.issued);
            if (issuedLeft.length === 0) {
              // all redeemed but no voucher
              this.notificationService.addPopup({
                title: 'Something went wrong, with our server',
                text: 'We notified our team. Sorry about the inconvenience.'
              });
              this.router.navigateByUrl('/home');
            }
          }
        },
        () => {
          this.notificationService.addPopup({
            title: 'Something went wrong, with our server',
            text: 'We notified our team. Sorry about the inconvenience.'
          });
          this.router.navigateByUrl('/home');
        }
      );
  }
}
