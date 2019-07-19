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
  public subTitle: string = 'Unlock your Netflix rebate.';

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
      .pipe(
        map(cards => cards.filter(card => card.state === STAMP_CARD_STATE.active))
      )
      .subscribe(cards => {
        const lockedCards = cards.filter(card => {
          this.keys += card.stamps.filter(st => st.state === STAMP_STATE.issued).length;
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
    const totalSlots = card.display_properties.total_slots;

    this.stampService.putStamp(s.id)
      .subscribe(
        (stamp) => {
          if (stamp.state === STAMP_STATE.redeemed) {
            this.keys--;
            if (totalRedeemed === totalSlots) {
              this.cards.sort( (_A, b) => {
                if (b.stamps.filter(stmp => stmp.state === 'redeemed').length === totalSlots) {
                  return -1;
                }
              });
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
  }

  public onCompleted(): void {
  }

  public isCompleted(card: IStampCard): boolean {
    const totalSlots = card.display_properties.total_slots;
    return card.stamps.filter(stamp => stamp.state === 'redeemed').length === this.rows * totalSlots;
  }

  public isCurrent(card: IStampCard): boolean {
    return this.cards[0].id === card.id;
  }

  public checkKeys(): void {
    if (this.keys > 0) {
      this.notificationService.addPopup({
        title: `You have a total of ${this.keys} keys!`,
        imageUrl: 'assets/key.png',
        text: 'Tap the highlighted locks to unlock.',
        buttonTxt: 'Start Unlocking!'
      });
    }
  }

  public stampAll(card: IStampCard): void {
    console.log(card);
    
    const id = card.id;
    const totalSlots = card.display_properties.total_slots;
    const index = this.cards.findIndex(x => x.id === card.id);
    const redeemedCard = card.stamps.map(stamp => {
      return {...stamp, state: STAMP_STATE.redeemed}
    });

    this.cards[index].stamps = redeemedCard;

    this.stampService.stampAll(id).subscribe(
      (stamps) => {
        this.keys -= totalSlots;
        if (stamps) {
          this.router.navigate(['/congrats']);
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

  public getCols(card: IStampCard): number {
    return card.display_properties.total_slots;
  }
}
