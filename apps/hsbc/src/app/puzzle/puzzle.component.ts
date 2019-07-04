import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CampaignService,
  IStampCard,
  TRANSACTION_STATE,
  CAMPAIGN_TYPE,
  ICampaign,
  IStampCardResponse
} from '@perx/core/dist/perx-core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
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
  rows = 2;
  cols = 3;
  image = '';

  constructor(
    private campaignService: CampaignService,
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
      }
    }

    if (!localStorage.getItem('enableSound')) {
      setTimeout(() => {
        this.soundService.showPopup();
      }, 50);
    }
  }

  ngOnDestroy() {
    this.soundService.pause();
  }

  private fetchCampaign() {
    this.campaignService.getCampaigns()
      .pipe(
        map(data => data.data),
        map(campaigns => campaigns.filter(camp => camp.campaign_type === CAMPAIGN_TYPE.stamp))
      )
      .subscribe((campaigns: ICampaign[]) => {
        this.campaignId = campaigns && campaigns.length > 0 && campaigns[0].id;
        this.fetchCard();
      });
  }

  private fetchCard() {
    this.campaignService.getCurrentCard(this.campaignId)
      .subscribe((res: IStampCardResponse) => {
        const card = res.data;
        this.cardId = card.id;
        this.card = card;
        this.cols = card.display_properties.number_of_cols;
        this.rows = card.display_properties.number_of_rows;
        this.playedPieces = card.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.redeemed).length;
        const availablePieces = card.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.issued).length;
        this.availablePieces = Math.min(this.rows * this.cols - this.playedPieces, availablePieces);
        this.image = card.display_properties.card_image.value.image_url;
        // if (this.availablePieces === 0) {
        //   this.notificationService.addPopup({
        //     title: 'Thank you!',
        //     text: 'Unfortunately, you have no pieces available.'
        //   });
        //   this.router.navigate(['/home']);
        // }
      });
  }

  onMoved() {
    const stamps = this.card.stamps.filter(s => s.state === TRANSACTION_STATE.issued);
    if (stamps.length === 0) {
      // don't do anything
      return;
    }
    const stamp = stamps[0];
    stamp.state = TRANSACTION_STATE.redeemed;
    this.campaignService.putStampTransaction(stamp.id)
      .subscribe(
        (res) => {
          if (res.data.state === TRANSACTION_STATE.redeemed) {
            // this.fetchCard();
            if (res.data.vouchers && res.data.vouchers.length > 0) {
              const voucherId = res.data.vouchers[0].id;
              this.router.navigate([`/voucher/${voucherId}`, { win: true }]);
            }
          } else {
            const issuedLeft = this.card.stamps.filter(s => s.state === TRANSACTION_STATE.issued);
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
