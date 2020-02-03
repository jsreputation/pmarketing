import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ApiConfigServices } from '../configs/api-config';

export const BASE_URL_WS = new InjectionToken<string>('BaseUrl');

const providers: any[] = [
  ApiConfigServices
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
  ]
})
export class HttpServicesModule {

  constructor(@Optional() @SkipSelf() parentModule: HttpServicesModule) {
    if (parentModule) {
      throw new Error(
        'HttpServicesModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(baseUrl: string): ModuleWithProviders {
    return {
      ngModule: HttpServicesModule,
      providers: [
        ...providers,
        { provide: BASE_URL_WS, useValue: baseUrl },
      ]
    };
  }
}
