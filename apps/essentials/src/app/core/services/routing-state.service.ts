import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingStateService {
  private history: any[] = [];

  constructor(private router: Router) {
  }

  public loadRouting(): Observable<NavigationEnd> {
    return this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), tap(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      }));
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/';
  }

  public comeBackPreviousUrl(): void {
    this.router.navigateByUrl(this.getPreviousUrl());
  }
}
