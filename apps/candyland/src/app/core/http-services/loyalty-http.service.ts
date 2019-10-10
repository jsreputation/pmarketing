import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyalties(params: HttpParams): Observable<any> {
    // return this.http.get(ApiConfig.rewardsPath + '/', { params });
    return this.http.get('assets/actives/loyalty/loyalty-list.json', { params });
  }
}
