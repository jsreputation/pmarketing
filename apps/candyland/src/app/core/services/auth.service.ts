import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@cl-core/http-services/auth-http.service';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TokenService } from '@cl-core/services/token.service';
import { Observable } from 'rxjs';
import { AuthHttpAdapter } from '@cl-core/http-adapters/auth-http-adapter';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: AuthHttpService,
              private localStorage: LocalStorageService,
              private tokenService: TokenService,
              private router: Router) {

  }

  public signIn(data: any): Observable<any> {
    const sendData = AuthHttpAdapter.transformFromLogin(data);
    return this.http.signIn(sendData).pipe(
      tap(res => {
        if (res.headers.get('authorization')) {
          const token = res.headers.get('authorization');
          const userId = res.body.data.id;
          this.login(token, userId);
        }
      }),
      map(res => res.body)
    );
  }

  public login(token: string, userId: string): void {
    this.tokenService.token = token;
    this.localStorage.set('authToken', token);
    this.localStorage.set('userId', userId);
  }

  public logout(): void {
    this.tokenService.remove();
    this.localStorage.remove('authToken');
    this.localStorage.remove('userId');
    this.router.navigate(['/login']);
  }
}
