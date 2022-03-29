import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';


export interface IV4PlatformEnrolment {
  identifier: string;
  enrolled_in_perx: boolean;
}

export interface IV4PlatformEnrolmentResponse {
  data: IV4PlatformEnrolment;
}


@Injectable({
  providedIn: 'platform',
})

export class V4PlatformEnrolmentService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public validatePlatformEnrolment(): Observable<IV4PlatformEnrolment> {
    const url = `${this.apiHost}/v4/platform_enrolment`;
    return this.http.get<IV4PlatformEnrolmentResponse>(url)
      .pipe(
        map((resp: IV4PlatformEnrolmentResponse) => resp.data)
      );
  }
}
