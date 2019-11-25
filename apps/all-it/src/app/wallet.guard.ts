import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class WalletGuard implements CanActivate {
  constructor( private router: Router ) { }

  public canActivate(): boolean {
    if (this.router.url === '/signin') {
      this.router.navigateByUrl('/home');
    }

    return true;
  }

}
