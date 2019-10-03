import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';

@Component({
  selector: 'cl-reward-merchant-item',
  templateUrl: './reward-merchant-item.component.html',
  styleUrls: ['./reward-merchant-item.component.scss']
})
export class RewardMerchantItemComponent {
  @Input() public merchant: Merchant;
  @Input() public enableActions = false;
  @Output() public deleteMerchant = new EventEmitter<void>();

  public clickDeleteMerchant(): void {
    this.deleteMerchant.emit();
  }

}
