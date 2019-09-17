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
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: AuthHttpService,
              private localStorage: LocalStorageService,
              private sessionService: SessionService,
              private dataStore: DataStore,
              private userService: UserService,
              private router: Router
  ) {
  }

  public initAuth(): void {
    const localToken = this.localStorage.get('authToken');
    const localUserId = this.localStorage.get('userId');
    if (!localToken || !localUserId) {
      this.logout();
      return;
    }
    this.sessionService.token = localToken;
    this.updateUser(localUserId).subscribe(() => {});
  }

  public updateUser(id): Observable<IamUser> {
    return this.dataStore.findRecord(IamUser, id)
      .pipe(
        tap(user => this.userService.user = user),
        catchError(error => {
          this.logout();
          return of(error);
        })
      );
  }

  public signIn(data: any): Observable<any> {
    const sendData = AuthHttpAdapter.transformFromLogin(data);
    return this.http.signIn(sendData).pipe(
      tap(res => {
        if (res.headers.get('authorization')) {
          const token = res.headers.get('authorization');
          const user = this.dataStore.deserializeModel(IamUser, res.body.data);
          this.login(token, user);
        }
      }),
      map(res => res.body)
    );
  }

  public login(token: string, user: any): void {
    this.sessionService.token = token;
    this.userService.user = user;
    this.localStorage.set('authToken', token);
    this.localStorage.set('userId', user.id);
  }

  public logout(): void {
    this.sessionService.remove();
    this.userService.user = null;
    this.localStorage.remove('userId');
    this.localStorage.remove('authToken');
    this.router.navigate(['/login']);
  }
}
