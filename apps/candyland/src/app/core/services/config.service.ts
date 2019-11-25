import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { StatusLabelConfig } from '@cl-shared';
import { ConfigHttpService } from '@cl-core/http-services/config-http.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private configHttp: ConfigHttpService,
              private translate: TranslateService) { }

  public prepareStatusesLabel(): Observable<{ [key: string]: StatusLabelConfig }> {
    return combineLatest([this.getTranslationStatuses(), this.getStatusLabel()])
      .pipe(
        map(
          ([translation, statuses]) => {
            Object.values(statuses)
              .forEach((item) => {
                item.title = translation[item.title];
              });
            return statuses;
          }
        )
      );
  }

  public getTranslationStatuses(): Observable<any> {
    return this.translate.get('STATUSES_TYPE');
  }

  public getStatusLabel(): Observable<{ [key: string]: StatusLabelConfig }> {
    return this.configHttp.getStatusLabel();
  }
}
