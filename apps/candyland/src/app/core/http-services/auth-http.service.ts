import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { map } from 'rxjs/operators';
import { TokenService } from '@cl-core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient,
              private localStorage: LocalStorageService,
              private tokenService: TokenService
              ) { }

  public signIn(body: any): any {
    return this.http.post<any>(ApiConfig.signIn, {data: body}, {observe: 'response'})
    .pipe(
      map(res => {
        if (res.headers.get('authorization')) {
           this.localStorage.set('authToken', res.headers.get('authorization'));
           this.localStorage.set('userId', res.body.data.id);
        }
        return res;
      })
    );
  }

  public logout(): void {
    this.localStorage.remove('authToken');
    this.localStorage.remove('userId');
    this.tokenService.remove();
  }

}
