import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication/authentication.service';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public merchantUsername: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage
  ) { }

  public ngOnInit(): void {
    this.merchantUsername = this.tokenStorage.getAppInfoProperty('merchantUsername') || '';
  }

  public onSalesScan(): void {
    this.router.navigate(['/qrscanner/order']);
  }

  public onRedemption(): void {
    this.router.navigate(['/qrscanner/redeem']);
  }

  public onLogOut(): void {
    this.authService.logout();
    this.tokenStorage.clearAppInfoProperty(['merchantUsername']);
    this.router.navigate(['/login']);
  }

  public onTransactionHistory(): void {
    this.router.navigate(['/transaction-history']);
  }

}
