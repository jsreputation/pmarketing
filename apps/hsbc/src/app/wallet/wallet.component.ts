import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '@perx/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public sourceType: string;

  constructor(private configService: ConfigService) {}

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig) => {
        this.sourceType = config.sourceType.toString();
      }
    );
  }
}
