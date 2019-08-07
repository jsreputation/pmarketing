import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  StampService,
  StampState,
  StampCardState
} from '@perx/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public title: string = 'CONGRATULATIONS!';
  public subTitles: string[] = ['You have unlocked 1 out of 6 months', 'of Netflix rebate!'];
  public subsubTitles: string[] = [];
  public path: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private stampService: StampService) { }

  public ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.url[0].path;

    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params.cid && params.cid !== '') {
          const cid = Number.parseInt(params.cid, 10);
          this.fetchCards(cid);
        }
      });
  }

  public onBackToGame(): void {
    this.router.navigate(['bpi/game']);
  }

  /**
   * In order to update precisely the subtitle on number of unlocked cards.
   */
  private fetchCards(cId: number): void {
    this.stampService.getCards(cId)
      .subscribe(cards => {
        const unlockedCardsCount: number = cards.filter(card => {
          const totalSlots = card.displayProperties.totalSlots || 0;
          return card.state === StampCardState.active &&
            card.stamps &&
            card.stamps.filter(st => st.state === StampState.redeemed).length >= totalSlots;
        }).length;

        this.subTitles[0] = `You have unlocked ${unlockedCardsCount} out of ${cards.length} months`;

        if (unlockedCardsCount === cards.length) {
          this.subsubTitles = [
            `You have reached the maximum Netflix rebate of ${cards.length} months allowed per customer for this promo.`
          ];
        }
      });
  }
}
