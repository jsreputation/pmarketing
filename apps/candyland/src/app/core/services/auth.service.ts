import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataStore } from '@cl-core/http-adapters/datastore';
import { IamUser } from '@cl-core/http-adapters/iam-user';
import { AuthHttpService } from '@cl-core/http-services/auth-http.service';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { SessionService } from '@cl-core/services/session.service';
import { UserService } from '@cl-core/services/user.service';
import { Observable, of } from 'rxjs';
import { AuthHttpAdapter } from '@cl-core/http-adapters/auth-http-adapter';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { IWLoginAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: AuthHttpService,
    private localStorage: LocalStorageService,
    private sessionService: SessionService,
    private dataStore: DataStore,
    private userService: UserService,
    private router: Router
  ) {
  }

  public get userId(): string {
    return this.userService.userId || this.localStorage.get('userId');
  }
  public initAuth(): void {
    const localToken = this.localStorage.get('authToken');
    const localUserId = this.localStorage.get('userId');
    if (!localToken || !localUserId) {
      this.clearCache();
      return;
    }
    this.sessionService.token = localToken;
  }

  public updateUser(): Observable<IamUser> {
    return this.dataStore.findRecord(IamUser, this.userId)
      .pipe(
        filter(Boolean),
        tap(user => this.userService.user = user),
        catchError(error => {
          this.logout();
          return of(error);
        })
      );
  }

  public signIn(data: ILogin): Observable<IJsonApiPayload<IWLoginAttributes>> {
    const sendData = AuthHttpAdapter.transformFromLogin(data);
    return this.http.signIn(sendData).pipe(
      tap(res => {
        if (res.headers.get('authorization')) {
          const token: string = res.headers.get('authorization');
          let dat = res.body.data;
          if (Array.isArray(dat)) {
            dat = dat[0];
          }
          const user: IamUser = this.dataStore.deserializeModel(IamUser, dat);
          this.login(token, user);
        }
      }),
      map(res => res.body)
    );
  }

  private login(token: string, user: IamUser): void {
    this.sessionService.token = token;
    this.userService.user = user;
    this.localStorage.set('authToken', token);
    this.localStorage.set('userId', user.id);
  }

  private clearCache(): void {
    this.sessionService.remove();
    this.userService.user = null;
    this.localStorage.remove('userId');
    this.localStorage.remove('authToken');
  }

  public logout(): void {
    this.clearCache();
    this.router.navigate(['/login']);
  }
}
