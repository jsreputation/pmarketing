import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IExchangerate } from '@perxtech/core';
@Component({
  selector: 'point-conversion-confirmation',
  templateUrl: './point-conversion-confirmation.component.html',
  styleUrls: ['./point-conversion-confirmation.component.scss']
})
export class PointConversionConfirmationComponent implements OnInit {

  @Input() public exchangeRateMessage: string;
  @Input() public expiryMessage: string;
  @Input() public exchangeRate: IExchangerate | undefined;
  @Input() public pointValue: number;
  @Output() public canceled: EventEmitter<void> = new EventEmitter<void>();
  @Output() public transferPoints: EventEmitter<void> = new EventEmitter<void>();
  public sourcePointValue: number;

  constructor() { }

  public ngOnInit(): void {
    this.calculateDestinationAmount();
  }

  private calculateDestinationAmount(): void {
    if (this.exchangeRate) {
      this.sourcePointValue = this.pointValue;
      this.pointValue = this.pointValue * (this.exchangeRate.destinationAmount / this.exchangeRate.sourceAmount);
    }
  }

  public cancel(): void {
    this.canceled.emit();
  }

  public transfer(): void {
    this.transferPoints.emit();
  }

}
