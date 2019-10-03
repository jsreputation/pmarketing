import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IStampCard, NotificationService } from '@perx/core';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {
  public campaignId: number = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.campaignId = Number.parseInt(params.get('campaignId'), 10);
    });
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }

  public completed(): void {
    this.notificationService.addPopup({
      // tslint:disable-next-line: max-line-length
      text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
    });
  }
}
