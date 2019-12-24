import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IWNotificationAttributes, IJsonApiListPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class NotificationHttpService {

  constructor(private http: HttpClient) { }

  public createNotification(data: any): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.post<IJsonApiListPayload<IWNotificationAttributes>>(`${ApiConfig.campaignsNotificationPath}`, data);
  }

  public getNotifications(params: HttpParams): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.get<IJsonApiListPayload<IWNotificationAttributes>>(`${ApiConfig.campaignsNotificationPath}`, { params });
  }

  public deleteNotification(id: string): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.delete<IJsonApiListPayload<IWNotificationAttributes>>(`${ApiConfig.campaignsNotificationPath}/${id}`);
  }

  public updateNotification(id: string, data: any): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.http.patch<IJsonApiListPayload<IWNotificationAttributes>>(`${ApiConfig.campaignsNotificationPath}/${id}`, data);
  }
}
