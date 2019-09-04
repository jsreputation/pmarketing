import { Injectable } from '@angular/core';
import { AuthHttpService } from '@cl-core/http-services/auth-http.service';
import { Observable } from 'rxjs';
import { AuthHttpAdapter } from '@cl-core/http-adapters/auth-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: AuthHttpService
    ) { }

  public signIn(data: any): Observable<any> {
    const sendData = AuthHttpAdapter.transformFromLogin(data);
    return this.http.signIn(sendData);
  }

  public logOut(): void {
    return this.http.logout();
  }
}
