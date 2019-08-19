import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent {
  @Output() public closeModal: EventEmitter<void> = new EventEmitter();
  constructor(
    private router: Router,
    private location: Location
  ) { }

  public closeRedeem(): void {
    if (this.router.url === '/reedem') {
      return this.location.back();
    }
    this.closeModal.emit();
  }
}
