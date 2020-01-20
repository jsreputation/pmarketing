import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWStampEngagementAttributes, IJsonApiPostItem, IJsonApiItemPayload, IJsonApiPatchItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class StampHttpService {

  constructor(private http: HttpClient) {
  }

  public createStamp(data: IJsonApiPostItem<IWStampEngagementAttributes>): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWStampEngagementAttributes>>(ApiConfig.stampsPath + '/', data);
  }

  public updateStamp(id: string, data: IJsonApiPatchItem<IWStampEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWStampEngagementAttributes>>(ApiConfig.engagementsPath + '/stamps/' + id, data);
  }

  public getStamp(id: string): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWStampEngagementAttributes>>(ApiConfig.engagementsPath + '/stamps/' + id);
  }
}
