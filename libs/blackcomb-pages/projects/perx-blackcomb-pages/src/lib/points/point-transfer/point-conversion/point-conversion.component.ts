import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
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
  public currentExchangeRate: IExchangerate | undefined;
  public exchangerateMessage: string | undefined;
  private exchangeRates: IExchangerate[];

  constructor(private loyaltyService: LoyaltyService) { }

  public ngOnInit(): void {
    this.getAllLoyaltyPrograms();
  }

  private getAllLoyaltyPrograms(): void {
    this.loyaltyService.getLoyalties().subscribe((loyaltyPrograms: ILoyalty[]) => {
      // this.loyaltyPrograms = loyaltyPrograms;
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

  // private buildConfirmationMessage(): void {

  // }

  public onSourceChanged(event: MatOptionSelectionChange): void {
    this.getExchangeRates(event.source.value);
  }

  public onDestinationChanged(event: MatOptionSelectionChange): void {
    this.setCurrentExchangeRate(event.source.value);
  }

  private setCurrentExchangeRate(destinationCampaignId: number): void {
    // if source is not set by user on first load, exchange rates wont be defined. so dont even try
    if (this.exchangeRates) {
      // find record that matches selected destination ID from this.exchangeRates
      this.currentExchangeRate = this.exchangeRates.find(rate => rate.destinationCampaignId === destinationCampaignId);
      // it is possible that some programs may not have rates defined
      if (this.currentExchangeRate) {
        this.buildExchangeRateMessage();
      } else {
        // reset exchange rate message
        this.exchangerateMessage = undefined;
      }
    }
  }

  private buildExchangeRateMessage(): void {
    this.exchangerateMessage = `${this.currentExchangeRate?.sourceAmount} point = ${this.currentExchangeRate?.destinationAmount} point`;
  }

}
