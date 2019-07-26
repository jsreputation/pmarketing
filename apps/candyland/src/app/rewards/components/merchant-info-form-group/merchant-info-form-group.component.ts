import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cl-merchant-info-form-group',
  templateUrl: './merchant-info-form-group.component.html',
  styleUrls: ['./merchant-info-form-group.component.scss']
})
export class MerchantInfoFormGroupComponent implements OnInit {
  @Input() public merchant = {
    image: '/assets/images/spin-the-wheel-preview.png',
    type: 'Starbucks',
    phone: '+65 9129 8888',
    category: '40 Branches'
  };
  @Output() public selectMerchant = new EventEmitter<any>();
  @Output() public createMerchant = new EventEmitter<any>();
  @Output() public deleteMerchant = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public clickSelectMerchant() {
    this.selectMerchant.emit();
  }

  public clickCreateMerchant() {
    this.createMerchant.emit();
  }

  public clickDeleteMerchant() {
    this.deleteMerchant.emit();
  }

}
