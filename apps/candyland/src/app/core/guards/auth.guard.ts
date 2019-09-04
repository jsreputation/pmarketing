import {
  CanActivate,
  Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@cl-core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isAuthenticated: boolean;

  constructor(private router: Router, private localStorage: LocalStorageService) {
    this.isAuthenticated = !!this.localStorage.get('authToken');
  }

  public canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
