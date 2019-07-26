import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.router.navigate(['/qrscanner/reward-redemption']);
  }

  public onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
