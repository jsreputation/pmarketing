import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  public ngOnInit(): void {
  }

  public onSalesScan(): void {
    this.router.navigate(['/qrscanner/order']);
  }

  public onRedemption(): void {
    this.router.navigate(['/qrscanner/redeem']);
  }

  public onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onTransactionHistory(): void {
    this.router.navigate(['/transaction-history']);
  }

}
