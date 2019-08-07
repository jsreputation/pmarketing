import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'cl-reward-merchant-card',
  templateUrl: './reward-merchant-card.component.html',
  styleUrls: ['./reward-merchant-card.component.scss']
})
export class RewardMerchantCardComponent {
  @Output() public selectMerchant = new EventEmitter<void>();
  @Output() public createMerchant = new EventEmitter<void>();

  public clickSelectMerchant(): void {
    this.selectMerchant.emit();
  }

  public clickCreateMerchant(): void {
    this.createMerchant.emit();
  }

}
