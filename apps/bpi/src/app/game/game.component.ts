import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  StampService,
  CampaignService,
  CampaignType,
  ICampaign,
  IStampCard,
  IStamp,
  StampCardState,
  StampState
} from '@perx/core/dist/perx-core';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public subTitles: string[] = ['Unlock your Netflix rebate.'];
  public subsubTitles: string[] = null;
  public title: string = null;

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
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchCards();
      });
  }

  private fetchCards(): void {
    this.stampService.getCards(this.campaignId)
      // .pipe(
      // map(cards => cards.filter(card => card.state === StampCardState.active))
      // )
      .subscribe(cards => {
        const lockedCards = cards.filter(card => {
          this.keys += card.stamps.filter(st => st.state === StampState.issued).length;
          const totalSlots = card.displayProperties.totalSlots || 0;
          // return card.state === StampCardState.active &&
          return card.stamps &&
            card.stamps.filter(st => st.state === StampState.redeemed).length < totalSlots;
        });

        const unlockedCards = cards.filter(card => {
          const totalSlots = card.displayProperties.totalSlots || 0;
          return card.state === StampCardState.active &&
            card.stamps &&
            card.stamps.filter(st => st.state === StampState.redeemed).length >= totalSlots;
        });

        this.cards = [
          ...lockedCards,
          ...unlockedCards
        ];

        if (lockedCards.length === 0) {
          this.title = 'CONGRATULATIONS!';
          this.subTitles = [
            // `You have now unlocked ${this.cards.length} out of ${this.cards.length} Netflix rebates!`
            `You have unlocked ${this.cards.length} out of ${this.cards.length} months of Netflix rebate!`
          ];

          this.subsubTitles = [
            // `You have reached the maximum of ${this.cards.length} months of Netflix rebate allowed per customer for this promo.`
            `You have reached the maximum Netflix rebate of ${this.cards.length} months allowed per customer for this promo.`
          ];
        }

        this.checkKeys();
      });
  }

  public getPlayedPieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const redeemedStamps = card.stamps.filter(stamp => stamp.state === StampState.redeemed);
      return redeemedStamps.length;
    }

    return 0;
  }

  public getAvailablePieces(card: IStampCard): number {
    if (card.stamps && card.stamps.length > 0) {
      const issuedStamps = card.stamps.filter(stamp => stamp.state === StampState.issued);
      return issuedStamps.length;
    }

    return 0;
  }

  public onMoved = (card: IStampCard) => {
    const stamps = card.stamps && card.stamps.filter(stmp => stmp.state === StampState.issued) || [];
    if (stamps.length === 0) {
      return;
    }

    const s = stamps[0];
    s.state = StampState.redeemed;
    this.checkKeys(card);

    const totalRedeemed = card.stamps.filter(stmp => stmp.state === StampState.redeemed).length;
    const totalSlots = card.displayProperties.totalSlots;

    this.stampService.putStamp(s.id)
      .subscribe(
        (stamp) => {
          if (stamp.state === StampState.redeemed) {
            this.keys--;
            if (this.keys < 0) {
              this.keys = 0;
            }
            if (totalRedeemed === totalSlots) {
              setTimeout(() => {
                this.router.navigate(['bpi/congrats'], { queryParams: { cid: this.campaignId } });
              }, 2000);
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

  private checkKeys(cardSelected?: IStampCard): void {
    if (this.keys <= 0) {
      return;
    }

    if (!cardSelected && this.keys > 0) {
      const title = this.keys === 1 ? 'You have a total of 1 key!' : `You have a total of ${this.keys} keys!`;
      this.notificationService.addPopup({
        title,
        imageUrl: 'assets/key.png',
        text: 'Tap the highlighted locks to unlock your Netflix rebate.',
        buttonTxt: 'Start Unlocking!',
        afterClosedCallBack: this
      });
      return;
    }

    const cardSelectedLength = cardSelected.stamps.length;
    const cardSelectedRedeemed = cardSelected.stamps.filter(stamp => stamp.state === 'redeemed').length;
    const totalSlots = cardSelected.displayProperties.totalSlots;
    const requiredKeysToUnlock = totalSlots - cardSelectedRedeemed;

    if (cardSelectedRedeemed === cardSelectedLength && cardSelectedRedeemed < totalSlots) {
      const text = requiredKeysToUnlock === 1 ?
        `You only need 1 key to earn your Netflix rebate. Keep using your BPI Credit Card to get your Netflix rebate of up to 6 months.` :
        // tslint:disable-next-line:max-line-length
        `You only need ${requiredKeysToUnlock} keys to earn your Netflix rebate. Keep using your BPI Credit Card to get your Netflix rebate of up to 6 months.`;
      this.notificationService.addPopup({
        text,
        buttonTxt: 'Close',
        afterClosedCallBack: this
      });
    }
  }

  public dialogClosed(): void { }

  public onStampAll(cardSelected: IStampCard): void {
    const id = cardSelected.id;
    const totalSlots = cardSelected.displayProperties.totalSlots;
    const index = this.cards.findIndex(card => card.id === id);

    const redeemedStamps = cardSelected.stamps.map(stamp => {
      return { ...stamp, state: StampState.redeemed };
    });

    this.cards[index].stamps = redeemedStamps;
    this.checkKeys(cardSelected);

    this.stampService.stampAll(id).subscribe(
      (res: IStamp[]) => {
        const stampsRedeemed = res.filter(stamp => stamp.state === 'redeemed').length;
        this.keys -= stampsRedeemed;
        if (this.keys < 0) {
          this.keys = 0;
        }
        if (stampsRedeemed === totalSlots) {
          setTimeout(() => {
            this.router.navigate(['bpi/congrats'], { queryParams: { cid: this.campaignId } });
          }, 2000);
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

  public onReadTermsConditions(): void {
    this.router.navigate(['bpi/terms-conditions']);
  }
}
