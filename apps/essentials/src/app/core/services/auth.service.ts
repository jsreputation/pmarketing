import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@es-core/http-services/auth-http.service';
import { parseJwt } from '@es-helpers/parse-jwt';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, filter, catchError } from 'rxjs/operators';
import { IJsonApiItemPayload, IWIAMUserAttributes } from '@perx/whistler';
import { HttpResponse } from '@angular/common/http';
import { AuthHttpAdapter } from '@es-core/http-adapters/auth-http-adapter';
import { IamUserService } from '@es-core/services/iam-user.service';
import { IAMUser } from '@es-core/models/auth/IAMUser.interface';
import { LocalStorageService } from '@es-core/services/local-storage.service';
import { SessionService } from '@es-core/services/session.service';
import { UserService } from '@es-core/services/user.service';
import { IamUserHttpAdapter } from '@es-core/http-adapters/iam-user-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: AuthHttpService,
    private localStorage: LocalStorageService,
    private sessionService: SessionService,
    private iamUserService: IamUserService,
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

  public updateUser(): Observable<IAMUser> {
    return this.iamUserService.getUser(this.userId)
      .pipe(
        filter(Boolean),
        tap(user => this.userService.user = user),
        catchError(error => {
          this.logout();
          return of(error);
        })
      );
  }

  public signIn(data: ILogin): Observable<IJsonApiItemPayload<IWIAMUserAttributes>> {
    const sendData = AuthHttpAdapter.transformFromLogin(data);
    return this.http.signIn(sendData).pipe(
      tap(res => {
        if (res.headers.get('authorization')) {
          const token: string = res.headers.get('authorization');
          let dat = res.body.data;
          if (Array.isArray(dat)) {
            dat = dat[0];
          }
          const user: IAMUser = IamUserHttpAdapter.transformToIAMUser(dat);
          this.login(token, user);
        }
      }),
      map(res => res.body)
    );
  }

  private login(token: string, user: any): void {
    this.saveToken(token);
    this.saveUser(user);

  }

  private saveToken(token: string): void {
    this.sessionService.token = token;
    this.localStorage.set('authToken', token);
  }

  private saveUser(user: IAMUser): void {
    this.userService.user = user;
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

  public resetPassword(username: string): Observable<any> {
    return this.http.resetPassword(username);
  }

  public changePassword(password: string, token: string): Observable<any> {
    return this.http.changePassword(password, token)
      .pipe(
        switchMap((res: HttpResponse<any>) => {
            if (res.headers.get('authorization')) {
              const tokenString: string = res.headers.get('authorization');
              this.saveToken(tokenString);
              const tokenObj = parseJwt(tokenString);
              const userName = tokenObj.sub.split('/').pop();
              return this.iamUserService.getUsers({'filter[username]': userName}).pipe(
                map(users => users[0]),
                tap((user: IAMUser) => this.saveUser(user))
              );
            }
            return of(null);
          }
        )
      );
  }
}
