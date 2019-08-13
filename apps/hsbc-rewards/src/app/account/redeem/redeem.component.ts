import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent {
  @Output() public closeModal: EventEmitter<void> = new EventEmitter();

  public closeRedeem(): void {
    this.closeModal.emit();
  }
}
