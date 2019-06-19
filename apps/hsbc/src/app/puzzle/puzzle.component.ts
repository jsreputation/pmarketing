import { Component, OnInit } from '@angular/core';
import { CampaignService, IStampCard } from '@perx/core/dist/perx-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {
  campaignId: number = null;
  private cardId: number = null;
  private card: IStampCard = null;

  constructor(private campaignService: CampaignService, private route: ActivatedRoute) { }

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

  private fetchCampaign() { }

  private fetchCard() {
    this.campaignService.getCurrentCard(this.campaignId)
      // .pipe(
      //   tap(card => console.log(card))
      // )
      .subscribe(card => {
        // this.n = card.data.stamps.filter(stamp => stamp.state === TRANSACTION_STATE.issued).length;
        this.cardId = card.data.id;
        this.card = card.data;
      });
  }

  availablePieces(): number {
    return 0;
  }

  playedPieces(): number {
    return 0;
  }
}
