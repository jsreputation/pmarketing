import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@cl-environments/environment';
import { ApiConfig } from '@cl-core/api-config';
import { TranslateLoaderService } from '@cl-core/translate-services/translate-loader-service';

@Injectable()
export class TranslateDashboardLoaderService extends TranslateLoaderService {
  public hostUrl: string = `http://localhost:4200/assets/i18n/dashboard/`;

  constructor(public httpClient: HttpClient) {
    super(httpClient);
    if (environment.production) {
      this.hostUrl = `${ApiConfig.basePath}/assets/i18n/dashboard/`;
    }
  }
}
