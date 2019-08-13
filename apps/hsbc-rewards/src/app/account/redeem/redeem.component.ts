import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent {
  @Output() closeModal = new EventEmitter();
  
  closeRedeem() {
    this.closeModal.emit();
  }
}
