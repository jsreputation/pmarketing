import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPCustomImageRatios, IPCustomImageRatioPutResponse, IPCustomImageRatio } from '@perxtech/model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getCustomImageRatios(): Observable<IPCustomImageRatios> {
    return this.http.get<IPCustomImageRatios>(`${this.apiConfig.baseApiPath}/v4/dash/simple/custom_image_ratios`);
  }

  public putCustomImageRatio(query: IPCustomImageRatio): Observable<IPCustomImageRatioPutResponse> {
    return this.http.post<IPCustomImageRatioPutResponse>(`${this.apiConfig.baseApiPath}/v4/dash/custom_image_ratios/${query.id}`, query);
  }

  public deleteCustomRatio(id: number): Observable<void> {
    return this.http.delete(`${this.apiConfig.baseApiPath}/v4/dash/custom_image_ratios/${id}`)
      .pipe(map(() => (void 0)));
  }
}
