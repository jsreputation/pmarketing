import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { IPCategories } from '@perx/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getCategories(): Observable<IPCategories> {
    return this.http.get<IPCategories>(`${this.apiConfig.baseApiPath}/v4/dash/categories`);
  }
}
