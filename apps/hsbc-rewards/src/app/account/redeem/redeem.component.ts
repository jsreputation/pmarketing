import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent {
  constructor(
    private router: Router,
    private location: Location
  ) { }

  public closeRedeem(): void {
    return this.location.back();
  }
}
