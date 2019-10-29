import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, IConfig } from '@perx/core';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public voucherId: number;
  public sourceType: string;

  public useMinimalStyle: boolean;
  public buttonText: string = 'Redeem later';

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
  ) {
  }

  public ngOnInit(): void {
    this.voucherId = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.sourceType = config.sourceType as string;

        if (config.sourceType === 'hsbc-xmas') {
          this.useMinimalStyle = true;
          this.buttonText = 'Cancel';
        }
      }
    );
  }
}
