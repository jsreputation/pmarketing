import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { IExchangerate, ILoyalty, LoyaltyService } from '@perxtech/core';

interface ISelectOption {
  value: number;
  text: string;
}
@Component({
  selector: 'point-conversion',
  templateUrl: './point-conversion.component.html',
  styleUrls: ['./point-conversion.component.scss']
})

export class PointConversionComponent implements OnInit {
  public loyaltyProgramList: ISelectOption[];
  public exchangeRateMessage: string | undefined;
  public confirmationMessage: string | undefined;
  public exchangeCalculationMessage: string | undefined;
  public expiryMessage: string | undefined;
  private currentExchangeRate: IExchangerate | undefined;
  private exchangeRates: IExchangerate[];

  constructor(private loyaltyService: LoyaltyService, private translateService: TranslateService) { }

  public ngOnInit(): void {
    this.getAllLoyaltyPrograms();
  }

  private getAllLoyaltyPrograms(): void {
    this.loyaltyService.getLoyalties().subscribe((loyaltyPrograms: ILoyalty[]) => {
      this.buildLoyaltyProgramNameArray(loyaltyPrograms);
    });
  }

  private buildLoyaltyProgramNameArray(loyaltyPrograms: ILoyalty[]): void {
    this.loyaltyProgramList = loyaltyPrograms.map((loylatyProgram: ILoyalty) =>
      ({ value: loylatyProgram.id, text: loylatyProgram.name })
    );
  }

  private getExchangeRates(sourceLoyaltyId: number): void {
    this.loyaltyService.getLoyaltyExchangerates(sourceLoyaltyId).subscribe((rates: IExchangerate[]) => {
      this.exchangeRates = rates;
    });
  }

  public onSourceChanged(event: MatOptionSelectionChange): void {
    this.getExchangeRates(event.source.value);
  }

  public onDestinationChanged(event: MatOptionSelectionChange): void {
    this.setCurrentExchangeRate(event.source.value);
    this.buildExpiryMessage();
  }

  private setCurrentExchangeRate(destinationCampaignId: number): void {
    // if source is not set by user on first load, exchange rates wont be defined. so dont even try
    if (this.exchangeRates) {
      // find record that matches selected destination ID from this.exchangeRates
      this.currentExchangeRate = this.exchangeRates.find(rate => rate.destinationCampaignId === destinationCampaignId);
      // it is possible that some programs may not have rates defined
      if (this.currentExchangeRate) {
        this.buildConfirmationMessage();
      } else {
        // reset exchange rate message
        this.exchangeRateMessage = undefined;
        this.exchangeCalculationMessage = undefined;
      }
    }
  }

  private buildExchangeRateMessage(): void {
    this.translateService.get(['POINTS_TRANSFER.POINT', 'POINTS_TRANSFER.POINTS']).subscribe((point: string[]) => {
      const pointText = point['POINTS_TRANSFER.POINT'];
      const pointsText = point['POINTS_TRANSFER.POINTS'];
      if (this.currentExchangeRate?.sourceAmount && this.currentExchangeRate?.destinationAmount) {
        this.exchangeRateMessage =
          `${this.currentExchangeRate?.sourceAmount} ${this.currentExchangeRate.sourceAmount > 1 ? pointsText : pointText} => ${this.currentExchangeRate?.destinationAmount} ${this.currentExchangeRate?.destinationAmount > 1 ? pointsText : pointText}`;
      }
    });
  }

  private buildConfirmationMessage(): void {
    this.translateService.get('POINTS_TRANSFER.CONVERSION_CALCULATION').subscribe((message: string) => {
      if (this.currentExchangeRate?.destinationCampaignName) {
        this.exchangeCalculationMessage = message.replace('{programName}', this.currentExchangeRate.destinationCampaignName).replace('{points}', '1234');
      }

    });
    this.buildExchangeRateMessage();
  }

  private buildExpiryMessage(): void {
    this.translateService.get('POINTS_TRANSFER.EXPIRY_NOTICE').subscribe((message: string) => {
      if (this.currentExchangeRate?.destinationCampaignName) {
        this.expiryMessage = message.replace('{programName}', this.currentExchangeRate.destinationCampaignName).replace('{date}', 'asdfasdff');
      }
    });
  }
}
