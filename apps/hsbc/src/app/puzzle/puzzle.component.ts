import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CampaignType,
  ICampaignService,
  StampService,
  ICampaign,
  IStampCard,
  StampCardState,
  StampState,
  NotificationService,
  IStamp
} from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SoundService } from '../sound/sound.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit, OnDestroy {
  public campaignId: number = null;
  private cardId: number = null;
  private card: IStampCard = null;
  public availablePieces: number = 0;
  public playedPieces: number = 0;
  public totalAvailablePieces: number = 0;
  public rows: number = 2;
  public cols: number = 3;
  public image: string = '';
  private cardsCount: number = 0;
  private currentStampId: number = 0;
  public title: string = 'Stamp Card';
  public subTitle: string = 'Earn rewards by collecting stamps';

  constructor(
    private campaignService: ICampaignService,
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private soundService: SoundService
  ) {
  }

  public ngOnInit(): void {
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
    } else if (this.cardId === null || this.card === null) {
      this.fetchCard();
      this.fetchStampTransactionCount();
      this.fetchCardsCount();
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

  public ngOnDestroy(): void {
    this.soundService.pause(false);
  }

  private fetchCampaign(): void {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchStampTransactionCount();
        this.fetchCard();
        this.fetchCardsCount();
      });
  }

  private fetchCard(): void {
    this.stampService.getCurrentCard(this.campaignId)
      .subscribe((card: IStampCard) => {
        this.cardId = card.id;
        this.card = card;
        this.cols = card.displayProperties.numberOfCols;
        this.rows = card.displayProperties.numberOfRows;
        this.playedPieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.redeemed).length : 0;
        const availablePieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.issued).length : 0;
        this.availablePieces = Math.min(this.rows * this.cols - this.playedPieces, availablePieces);
        this.image = card.displayProperties.cardImage.value.imageUrl;
        if (this.availablePieces === 0 && card.state === StampCardState.inactive) {
          this.notificationService.addPopup({
            title: 'Thank you!',
            text: 'Unfortunately, you have no pieces available.'
          });
          this.router.navigate(['/home']);
        }

      });
  }

  private fetchCardsCount(): void {
    if (this.campaignId === null) {
      return;
    }
    this.stampService.getCards(this.campaignId)
      .subscribe(
        (cards: IStampCard[]) => { this.cardsCount = cards.length; },
        () => { }
      );
  }

  private fetchStampTransactionCount(): void {
    this.stampService.getStamps(this.campaignId)
      .subscribe((stamps: IStamp[]) => {
        this.totalAvailablePieces = stamps.filter(stamp => stamp.state === StampState.issued).length;
      });
  }

  public onMoved(): void {
    const stamps = this.card.stamps.filter(s => s.state === StampState.issued);
    if (stamps.length === 0) {
      // don't do anything
      return;
    }
    const firstAvailableStamp = stamps[this.currentStampId];
    this.stampCard(firstAvailableStamp.id);

  }

  public stampClicked(stamp: {id: number, state: string}): void {
    this.stampCard(stamp.id);
  }

  private stampCard(stampId: number): void {
    this.stampService.putStamp(stampId, 'hsbc-collect2')
    .subscribe(
      (stamp: IStamp) => {
        if (stamp.state === StampState.redeemed) {
          if (this.card.cardNumber === this.cardsCount) { // we are on the last card
            const redeemedTransactionsCount = this.card.stamps.filter(s => s.state === StampState.redeemed).length;
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
          const issuedLeft = this.card.stamps.filter(s => s.state === StampState.issued);
          if (issuedLeft.length === 0) {
            // all redeemed but no voucher
            this.notificationService.addPopup({
              title: 'Something went wrong, with our server',
              text: 'We notified our team. Sorry about the inconvenience.'
            });
            this.router.navigateByUrl('/home');
          }
        }
        this.currentStampId++;
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
