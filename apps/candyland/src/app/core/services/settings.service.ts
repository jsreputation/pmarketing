import { Injectable } from '@angular/core';
import { SettingsHttpService } from '@cl-core/http-services/settings-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private settingsHttpService: SettingsHttpService) { }

  public getTimeZone(): Observable<ISimpleValue[]> {
    return this.settingsHttpService.getTimeZone()
      .pipe(
        map((res: ISimpleValue[]) => res)
      );
  }

  public getCurrency(): Observable<ISimpleValue[]> {
    return this.settingsHttpService.getCurrency()
      .pipe(
        map((res: ISimpleValue[]) => res)
      );
  }

  public getRoles(): Observable<any[]> {
    return this.settingsHttpService.getRoles();
  }
}
