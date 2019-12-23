import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLimitAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

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
    data: IJsonApiPatchItem<IWLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {
    const eType = this.getEngagementTypeLink(engagementType);
    const url = `${ApiConfig.basePath}/${eType}/limits/${id}`;
    return this.http.patch<IJsonApiItemPayload<IWLimitAttributes>>(url, data);
  }

  public createLimit(
    data: IJsonApiPostItem<IWLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {
    const eType = this.getEngagementTypeLink(engagementType);
    return this.http.post<IJsonApiItemPayload<IWLimitAttributes>>(
      `${ApiConfig.basePath}/${eType}/limits`,
      data
    );
  }

  public deleteLimit(engagementType: string, limitId: number | string): Observable<void> {
    const eType = this.getEngagementTypeLink(engagementType);
    return this.http.delete<void>(`${ApiConfig.basePath}/${eType}/limits/${limitId}`);
  }

  private getEngagementTypeLink(type: string): string {
    return EngagementTypeAPIMapping[type].replace('_', '-');
  }
}
