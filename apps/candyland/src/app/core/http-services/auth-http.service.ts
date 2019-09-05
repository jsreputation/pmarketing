import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  public signIn(body: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(ApiConfig.signIn, {data: body}, {observe: 'response'});
  }
}
