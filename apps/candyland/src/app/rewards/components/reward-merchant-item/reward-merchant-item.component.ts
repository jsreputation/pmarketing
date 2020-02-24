import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';

@Component({
  selector: 'cl-reward-merchant-item',
  templateUrl: './reward-merchant-item.component.html',
  styleUrls: ['./reward-merchant-item.component.scss']
})
export class RewardMerchantItemComponent {
  @Input() public merchant: IMerchantForm;
  @Input() public enableActions: boolean = false;
  @Output() public deleteMerchant: EventEmitter<void> = new EventEmitter<void>();

  public clickDeleteMerchant(): void {
    this.deleteMerchant.emit();
  }

}
