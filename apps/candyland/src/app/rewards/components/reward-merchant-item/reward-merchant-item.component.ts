import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cl-reward-merchant-item',
  templateUrl: './reward-merchant-item.component.html',
  styleUrls: ['./reward-merchant-item.component.scss']
})
export class RewardMerchantItemComponent {
  @Input() public merchant = {
    image: 'assets/images/spin-the-wheel-preview.png',
    type: 'Starbucks',
    phone: '+65 9129 8888',
    category: '40 Branches'
  };
  @Input() public enableActions = false;
  @Output() public deleteMerchant = new EventEmitter<void>();

  public clickDeleteMerchant() {
    this.deleteMerchant.emit();
  }

}
