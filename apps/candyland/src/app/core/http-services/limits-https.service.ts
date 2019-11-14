import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLimitAttributes } from '@perx/whistler';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) { }

  public getLimits(params: HttpParams, engagementType: string):
    Observable<IJsonApiListPayload<IWLimitAttributes>> {
    const eType = this.getEngagementTypeLink(engagementType);
    return this.http.get<IJsonApiListPayload<IWLimitAttributes>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimit(
    id: string,
    data: IJsonApiPayload<IWLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiPayload<IWLimitAttributes>> {
    const eType = this.getEngagementTypeLink(engagementType);
    const url = `${ApiConfig.basePath}/${eType}/limits/${id}`;
    return this.http.patch<IJsonApiPayload<IWLimitAttributes>>(url, data);
  }

  public createLimit(
    data: IJsonApiPayload<IWLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiPayload<IWLimitAttributes>> {
    const eType = this.getEngagementTypeLink(engagementType);
    return this.http.post<IJsonApiPayload<IWLimitAttributes>>(
      `${ApiConfig.basePath}/${eType}/limits`,
      data
    );
  }

  public deleteLimit(engagementType: string, limitId: number | string): Observable<void> {
    const eType = this.getEngagementTypeLink(engagementType);
    return this.http.delete(`${ApiConfig.basePath}/${eType}/limits/${limitId}`)
      // convert to a void observable in case of success
      .pipe(map(() => { return; }));
  }

  private getEngagementTypeLink(type: string): string {
    return EngagementTypeAPIMapping[type].replace('_', '-');
  }
}
