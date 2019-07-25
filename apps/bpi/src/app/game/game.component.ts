import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StampService,
  CampaignService,
  CAMPAIGN_TYPE,
  ICampaign,
  IStampCard,
  IStamp,
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
  public subTitle: string = 'Unlock your Netflix rebate with your BPI Credit Card.';

  private campaignId: number;

  public cards: IStampCard[] = [];

  public rows: number = 1;
  public keys: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private stampService: StampService,
    private notificationService: NotificationService
  ) {
  }

  public ngOnInit(): void {
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

  private fetchCampaign(): void {
    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CAMPAIGN_TYPE.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchCards();
      });
  }

  private fetchCards(): void {
    this.stampService.getCards(this.campaignId)
    // .pipe(
    // map(cards => cards.filter(card => card.state === STAMP_CARD_STATE.active))
    // )
      .subscribe(cards => {
        const lockedCards = cards.filter(card => {
          this.keys += card.stamps.filter(st => st.state === STAMP_STATE.issued).length;
          const totalSlots = card.displayProperties.totalSlots || 0;
          // return card.state === STAMP_CARD_STATE.active &&
          return card.stamps &&
            card.stamps.filter(st => st.state === STAMP_STATE.redeemed).length < totalSlots;
        });

        const unlockedCards = cards.filter(card => {
          const totalSlots = card.displayProperties.totalSlots || 0;
          return card.state === STAMP_CARD_STATE.active &&
            card.stamps &&
            card.stamps.filter(st => st.state === STAMP_STATE.redeemed).length >= totalSlots;
        });

        this.cards = [
          ...lockedCards,
          ...unlockedCards
        ];
        this.checkKeys();
      });
  }

  public getPlayedPieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const redeemedStamps = card.stamps.filter(stamp => stamp.state === STAMP_STATE.redeemed);
      return redeemedStamps.length;
    }

    return 0;
  }

  public getAvailablePieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const issuedStamps = card.stamps.filter(stamp => stamp.state === STAMP_STATE.issued);
      return issuedStamps.length;
    }

    return 0;
  }

  public onMoved = (card: IStampCard) => {
    const stamps = card.stamps && card.stamps.filter(stmp => stmp.state === STAMP_STATE.issued) || [];
    if (stamps.length === 0) {
      return;
    }

    const s = stamps[0];
    s.state = STAMP_STATE.redeemed;

    const totalRedeemed = card.stamps.filter(stmp => stmp.state === STAMP_STATE.redeemed).length;
    const totalSlots = card.displayProperties.totalSlots;

    this.stampService.putStamp(s.id)
      .subscribe(
        (stamp) => {
          if (stamp.state === STAMP_STATE.redeemed) {
            this.keys--;
            if (totalRedeemed === totalSlots) {
              setTimeout(() => {
                this.router.navigate(['bpi/congrats']);
              }, 3000);
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
  }

  public isCompleted(card: IStampCard): boolean {
    const totalSlots = card.displayProperties.totalSlots;
    return card.stamps.filter(stamp => stamp.state === 'redeemed').length === this.rows * totalSlots;
  }

  public isCurrent(card: IStampCard): boolean {
    return this.cards[0].id === card.id;
  }

  private checkKeys(): void {
    if (this.keys > 0) {
      this.notificationService.addPopup({
        title: `You have a total of ${ this.keys } keys!`,
        imageUrl: 'assets/key.png',
        text: 'Tap the highlighted locks to unlock your Netflix rebate.',
        buttonTxt: 'Start Unlocking!'
      });
    }
  }

  public onStampAll(cardSelected: IStampCard): void {
    const id = cardSelected.id;
    const totalSlots = cardSelected.displayProperties.totalSlots;
    const index = this.cards.findIndex(card => card.id === id);

    const redeemedStamps = cardSelected.stamps.map(stamp => {
      return { ...stamp, state: STAMP_STATE.redeemed };
    });

    this.cards[index].stamps = redeemedStamps;

    this.stampService.stampAll(id).subscribe(
      (res: IStamp[]) => {
        this.keys -= totalSlots;
        const stampsRedeemeed = res.filter(stamp => stamp.state === 'redeemed').length;
        if (stampsRedeemeed === totalSlots) {
          setTimeout(() => {
            this.router.navigate(['bpi/congrats']);
          }, 3000);
        }
      },
      (err) => {
        console.log(err);
        this.notificationService.addPopup({
          title: 'Something went wrong, with our server',
          text: 'We notified our team. Sorry about the inconvenience.'
        });
      }
    );
  }

  public getCardColumn(card: IStampCard): number {
    return card.displayProperties.totalSlots;
  }
}
