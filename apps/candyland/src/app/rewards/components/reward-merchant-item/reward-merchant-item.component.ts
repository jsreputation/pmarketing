import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cl-reward-merchant-item',
  templateUrl: './reward-merchant-item.component.html',
  styleUrls: ['./reward-merchant-item.component.scss']
})
export class RewardMerchantItemComponent implements OnInit {
  @Input() public merchant = {
    image: 'assets/images/spin-the-wheel-preview.png',
    type: 'Starbucks',
    phone: '+65 9129 8888',
    category: '40 Branches'
  };
  @Input() public enableActions = false;
  @Output() public deleteMerchant = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  public clickDeleteMerchant() {
    this.deleteMerchant.emit();
  }

}
