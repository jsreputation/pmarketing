import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WalletComponent {
  constructor(private router: Router) {
  }

  public onRoute(id: string): void {
    this.router.navigate([`/wallet/${id}`]);
  }
}
