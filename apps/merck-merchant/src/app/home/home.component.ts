import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenStorage } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage
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
    this.tokenStorage.clearAppInfoProperty(['merchantUsername']);
    this.router.navigate(['/login']);
  }

  public onTransactionHistory(): void {
    this.router.navigate(['/transaction-history']);
  }

}
