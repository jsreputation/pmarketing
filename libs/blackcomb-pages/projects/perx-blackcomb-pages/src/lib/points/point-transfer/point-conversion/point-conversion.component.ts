import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService, IExchangerate, ILoyalty, IPointTransfer, LoyaltyService, NotificationService } from '@perxtech/core';
import { globalCacheBusterNotifier } from 'ngx-cacheable';

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
  public destintionLoyaltyProgramList: ISelectOption[];
  public exchangeRateMessage: string | undefined;
  public confirmationMessage: string | undefined;
  public exchangeCalculationMessage: string | undefined;
  public expiryMessage: string | undefined;
  public currentExchangeRate: IExchangerate | undefined;
  private exchangeRates: IExchangerate[];
  public pointsAmount: number;
  public showConfirmation: boolean;

  constructor(
    private loyaltyService: LoyaltyService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private errorMessageService: ErrorMessageService,
    private router: Router) { }

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
      this.buildDestinationList();
    });
  }

  public onSourceChanged(event: MatOptionSelectionChange): void {
    this.getExchangeRates(event.source.value);
  }

  private buildDestinationList(): void {
    // build destimation list with only supported exchange rates
    this.destintionLoyaltyProgramList = this.loyaltyProgramList
      .filter((program) =>
        this.exchangeRates.findIndex(x => x.destinationCampaignId === program.value) > -1
      );
  }

  public onDestinationChanged(event: MatOptionSelectionChange): void {
    console.log('onDestinationChanged');
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

      this.loyaltyService.tansferPoints(transfer).subscribe(() => {
        // clear cache
        globalCacheBusterNotifier.next();
        // show success message and navigate to point history
        this.translateService.get('POINTS_TRANSFER.SUCCESS').subscribe((message: string) => {
          this.notificationService.addSnack(message);
          this.router.navigate(['/points/history']);
        });
      },
        (res) => {
          // handle errors
          console.error(res);
          if (res?.error?.message) {
            this.notificationService.addSnack(res.error.message);
          } else {
            // get the a genenric error message
            this.errorMessageService.getErrorMessageByErrorCode(0)
              .subscribe(message => this.notificationService.addSnack(message));
          }
        });
    }
  }

  public showTransferConfirmation(): void {
    this.exchangeCalculationMessage = undefined;
    this.showConfirmation = true;
  }

  public showTransferConversion(): void {
    this.showConfirmation = false;
  }

  public back(): void {
    this.router.navigate(['/account']);
  }

}
