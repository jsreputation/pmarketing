import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IConfig} from './models/config.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {

  }

  public readAppConfig(): Observable<IConfig> {
    return this.http.get<IConfig>('assets/config/app-config.json');
  }

}
