import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWNotificationAttributes, IJsonApiListPayload } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class NotificationHttpService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createNotification(data: any): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.post<IJsonApiListPayload<IWNotificationAttributes>>(`${this.apiConfig.campaignsNotificationPath}`, data);
  }

  public getNotifications(params: HttpParams): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.get<IJsonApiListPayload<IWNotificationAttributes>>(`${this.apiConfig.campaignsNotificationPath}`, { params });
  }

  public deleteNotification(id: string): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.delete<IJsonApiListPayload<IWNotificationAttributes>>(`${this.apiConfig.campaignsNotificationPath}/${id}`);
  }

  public updateNotification(id: string, data: any): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.patch<IJsonApiListPayload<IWNotificationAttributes>>(`${this.apiConfig.campaignsNotificationPath}/${id}`, data);
  }
}
