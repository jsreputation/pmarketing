import { Injectable, Injector } from '@angular/core';
import { BASE_URL_WS } from '../http-services/http-services.module';

@Injectable()
export class ApiConfigServices {
  public baseApiPath: string | null = null;

  constructor(private injector: Injector) {
    this.baseApiPath = this.injector.get<string>(BASE_URL_WS);
  }
}
