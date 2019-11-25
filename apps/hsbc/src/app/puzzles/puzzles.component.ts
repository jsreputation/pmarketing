import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ConfigService, IConfig, isEmptyString, IStampCard, NotificationService} from '@perx/core';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.scss']
})
export class PuzzlesComponent implements OnInit {
  public campaignId: number | null = null;
  public sourceType: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.sourceType = config.sourceType.toString();
      }
    );
    this.route.paramMap.subscribe(params => {
      if (isEmptyString(params.get('campaignId'))) {
        throw new Error(`campaignId is required`);
      }

      this.campaignId = Number.parseInt(params.get('campaignId') as string, 10);
    });
  }

  public selected(puzzle: IStampCard): void {
    this.router.navigate([`/puzzle/${this.campaignId}/${puzzle.id}`]);
  }

  public completed(): void {
    if (this.sourceType === 'puzzle') {
      this.notificationService.addPopup({
        // tslint:disable-next-line: max-line-length
        text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
      });
    }
  }
}
