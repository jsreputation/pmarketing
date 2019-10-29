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
  public voucherCode: string = 'XXXX - XXXX';

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
      }
    );
  }
}
