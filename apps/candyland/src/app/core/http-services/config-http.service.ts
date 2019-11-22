import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusLabelConfig } from '@cl-shared';

@Injectable({
  providedIn: 'root'
})
export class ConfigHttpService {

  constructor(private http: HttpClient) { }

  public getStatusLabel(): Observable<{ [key: string]: StatusLabelConfig }> {
    return this.http.get<{ [key: string]: StatusLabelConfig }>(`/assets/actives/statuses-type/statuses-type.json`);
  }
}
