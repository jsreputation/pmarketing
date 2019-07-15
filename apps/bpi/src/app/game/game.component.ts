import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StampService,
  CampaignService,
  CAMPAIGN_TYPE,
  ICampaign,
  IStampCard,
  STAMP_CARD_STATE,
  STAMP_STATE
} from '@perx/core/dist/perx-core';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  subTitle = 'Unlock your Netflix Rebate with your BPI Credit Card';

  campaignId: number;

  cards: IStampCard[] = [];

  rows = 1;
  cols = 6;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private stampService: StampService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    const campaignIdStr = this.route.snapshot.paramMap.get('campaignId');
    if (campaignIdStr && campaignIdStr !== '') {
      this.campaignId = Number.parseInt(campaignIdStr, 10);
    }

    if (!this.campaignId) {
      this.fetchCampaign();
    } else {
      this.fetchCards();
    }
  }

  private fetchCampaign() {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchCards();
      });
  }

  private fetchCards() {
    this.stampService.getCards(this.campaignId)
      .pipe(
        map(cards => cards.filter(card => card.state === STAMP_CARD_STATE.active))
      )
      .subscribe(cards => {
        const lockedCards = cards.filter(card => {
          const totalSlots = card.display_properties.total_slots || 0;
          return card.state === STAMP_CARD_STATE.active &&
            card.stamps &&
            card.stamps.filter(st => st.state === STAMP_STATE.redeemed).length < totalSlots;
        });

        const unlockedCards = cards.filter(card => {
          const totalSlots = card.display_properties.total_slots || 0;
          return card.state === STAMP_CARD_STATE.active &&
            card.stamps &&
            card.stamps.filter(st => st.state === STAMP_STATE.redeemed).length >= totalSlots;
        });

        this.cards = [
          ...lockedCards,
          ...unlockedCards
        ];
      });
  }

  getPlayedPieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const redeemedStamps = card.stamps.filter(stamp => stamp.state === STAMP_STATE.redeemed);
      return redeemedStamps.length;
    }

    return 0;
  }

  getAvailablePieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const issuedStamps = card.stamps.filter(stamp => stamp.state === STAMP_STATE.issued);
      return issuedStamps.length;
    }

    return 0;
  }

  onMoved = (card: IStampCard) => (move: {
    nbPlayedPieces: number,
    nbAvailablePieces: number
  }) => {
    const stamps = card.stamps && card.stamps.filter(s => s.state === STAMP_STATE.issued) || [];
    if (stamps.length === 0) {
      return;
    }

    let numOfStampsToRedeem = stamps.length - move.nbAvailablePieces;
    let index = 0;
    while (numOfStampsToRedeem > 0) {
      const s = stamps[index];
      s.state = STAMP_STATE.redeemed;
      this.stampService.putStamp(s.id)
        .subscribe(
          (stamp) => {
            if (stamp.state === STAMP_STATE.redeemed) {
              if (stamp.vouchers && stamp.vouchers.length > 0) {
                this.router.navigate(['/congrats']);
              }
            }
          },
          () => {
            this.notificationService.addPopup({
              title: 'Something went wrong, with our server',
              text: 'We notified our team. Sorry about the inconvenience.'
            });
          }
        );

      index++;
      numOfStampsToRedeem--;
    }
  }

  onCompleted() {
  }
}
