import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { IExchangerate, ILoyalty, IPointTransfer, LoyaltyService } from '@perxtech/core';

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
  public currentExchangeRate: IExchangerate | undefined;
  private exchangeRates: IExchangerate[];
  private pointsAmount: number;

  constructor(
    private loyaltyService: LoyaltyService,
    private translateService: TranslateService,
    private datePipe: DatePipe) { }

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

  public onPointValueChanged(element: HTMLInputElement): void {
    if (this.currentExchangeRate && !isNaN(element.valueAsNumber)) {
      this.buildConfirmationMessage(element.valueAsNumber);
      this.pointsAmount = element.valueAsNumber;
    } else {
      this.exchangeCalculationMessage = undefined;
    }
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
        this.exchangeRateMessage = undefined;
        this.exchangeCalculationMessage = undefined;
      }
    }
  }

  private buildExchangeRateMessage(): void {
    this.translateService.get(['POINTS_TRANSFER.POINT', 'POINTS_TRANSFER.POINTS']).subscribe((point: string[]) => {
      const pointText = point['POINTS_TRANSFER.POINT'];
      const pointsText = point['POINTS_TRANSFER.POINTS'];
      if (this.currentExchangeRate) {
        const rate = this.currentExchangeRate;
        this.exchangeRateMessage =
          `${rate.sourceAmount} ${rate.sourceAmount > 1 ? pointsText : pointText} => ${rate.destinationAmount} ${rate.destinationAmount > 1 ? pointsText : pointText}`;
      }
    });
  }

  private buildConfirmationMessage(value: number): void {
    if (this.currentExchangeRate) {
      const rate = this.currentExchangeRate;
      const pointConversion = (value * (rate.destinationAmount / rate.sourceAmount)).toString();
      this.translateService.get('POINTS_TRANSFER.CONVERSION_CALCULATION').subscribe((message: string) => {
        this.exchangeCalculationMessage = message
          .replace('{programName}', rate.destinationCampaignName)
          .replace('{points}', pointConversion);
      });
    }
  }

  private buildExpiryMessage(): void {
    this.translateService.get('POINTS_TRANSFER.EXPIRY_NOTICE').subscribe((message: string) => {
      if (this.currentExchangeRate) {
        const rate = this.currentExchangeRate;
        const dateString = this.datePipe.transform(rate.destinationCampaignEndsAt, 'd MMMM y');
        this.expiryMessage = dateString ? message
          .replace('{programName}', rate.destinationCampaignName)
          .replace('{date}', dateString ? dateString : '') : '';
      }
    });
  }

  public transferPoints(): void {
    if (this.currentExchangeRate) {
      const transfer: IPointTransfer = {
        amount: this.pointsAmount,
        sourceId: this.currentExchangeRate.sourceCampaignId,
        destinationId: this.currentExchangeRate.destinationCampaignId
      };
      // TODO: handle this
      this.loyaltyService.tansferPoints(transfer).subscribe(console.log);
    }
  }
}
