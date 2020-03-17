import { Config } from '@perx/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PreAuthGuard implements CanActivate {
  constructor(private router: Router, private config: Config) { }

  public canActivate(): boolean {
    if (this.config.preAuth) {
      this.router.navigateByUrl('/loading');
    }

    return true;
  }
}
