import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'cl-reward-merchant-card',
  templateUrl: './reward-merchant-card.component.html',
  styleUrls: ['./reward-merchant-card.component.scss']
})
export class RewardMerchantCardComponent {
  // @Input() public selected: 'select' | 'create' | null;
  @Output() public selectMerchant: EventEmitter<void> = new EventEmitter<void>();
  @Output() public createMerchant: EventEmitter<void> = new EventEmitter<void>();

  public clickSelectMerchant(): void {
    this.selectMerchant.emit();
  }

  public clickCreateMerchant(): void {
    this.createMerchant.emit();
  }

}
