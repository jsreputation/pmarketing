import { Component, OnInit } from '@angular/core';
import { CampaignService, IStampCard, STAMP_CARD_STATUS, TRANSACTION_STATE, CAMPAIGN_TYPE, ICampaign } from '@perx/core/dist/perx-core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {
  campaignId: number = null;
  private cardId: number = null;
  private card: IStampCard = null;
  availablePieces = 0;
  playedPieces = 0;

  constructor(private campaignService: CampaignService, private route: ActivatedRoute, private router: Router) { }

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
      // .pipe(
      //   tap(card => console.log(card))
      // )
      .subscribe(card => {
        // this.n = card.data.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.issued).length;
        this.cardId = card.data.id;
        this.card = card.data;
        this.playedPieces = this.card.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.redeemed).length;
        this.availablePieces = this.card.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.issued).length;
      });
  }

  onMoved(id: string) {
    this.campaignService.putStampTransaction(id)
      .subscribe(stamp => {
        if (stamp.stamp_transaction.state === TRANSACTION_STATE.redeemed) {
          this.fetchCard();
          if (stamp.stamp_transaction.vouchers && stamp.stamp_transaction.vouchers.length > 0) {
            const voucherId = stamp.stamp_transaction.vouchers[0].id;
            this.router.navigate([`/voucher/${voucherId}`, { win: true }]);
          }
        }
      });
  }
}
