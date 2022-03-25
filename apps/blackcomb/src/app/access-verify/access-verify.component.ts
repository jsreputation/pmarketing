import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenStorage } from '@perxtech/core';
import { Router } from '@angular/router';
import { interval, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-access-verify',
  templateUrl: './access-verify.component.html',
  styleUrls: ['./access-verify.component.scss']
})
export class AccessVerifyComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage) { }

  public ngOnInit(): void {
    interval(500).pipe(
      switchMap(() => of(sessionStorage.getItem('jwt_token'))),
      takeUntil(this.destroy$)
    ).subscribe(
      (token) => {
        if (token) {
          this.destroy$.next();
          sessionStorage.removeItem('jwt_token');
          this.authService.getExchangeToken(token).subscribe(() => {
              this.tokenStorage.clearAppInfoProperty(['appAccessToken']);
              this.router.navigate([ '/home' ]);
            },
            () => this.router.navigate([ '/error' ]));
        }
      }
    );
  }

}
