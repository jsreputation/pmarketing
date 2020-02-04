import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ConfigHttpService } from '@cl-core/http-services/config-http.service';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { IStatusLabelConfig } from '@perx/candyshop';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private configHttp: ConfigHttpService,
    private translate: TranslateService) {}

  public prepareStatusesLabel(): Observable<IStatusLabelConfig> {
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

  public getStatusLabel(): Observable<IStatusLabelConfig> {
    return this.configHttp.getStatusLabel();
  }
}
