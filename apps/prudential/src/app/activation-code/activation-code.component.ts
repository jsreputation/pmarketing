import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss']
})
export class ActivationCodeComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
  }

  pinInput(event: string): void {
    this.router.navigate(['/redemption']);
  }

  onCancel() {
    this.location.back();
  }
}
