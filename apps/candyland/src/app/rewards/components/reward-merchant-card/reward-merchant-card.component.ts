import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cl-reward-merchant-card',
  templateUrl: './reward-merchant-card.component.html',
  styleUrls: ['./reward-merchant-card.component.scss']
})
export class RewardMerchantCardComponent implements OnInit {
  @Output() public selectMerchant = new EventEmitter<void>();
  @Output() public createMerchant = new EventEmitter<void>();

  public clickSelectMerchant() {
    this.selectMerchant.emit();
  }

  public clickCreateMerchant() {
    this.createMerchant.emit();
  }

}
