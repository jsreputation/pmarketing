import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersHttpService } from './vouchers-https.service';
import { AuthHttpTestService } from './auth-http.service';

export const BASE_URL_WS = new InjectionToken<string>('BaseUrl');
export const BASE_CDN_URL_WS = new InjectionToken<string>('BaseCDNUrl');

const providers: any[] = [
  // {provide: BASE_URL_WS, useValue: 'http://localhost'},
  // {provide: BASE_CDN_URL_WS, useValue: 'https://cdn.uat.whistler.perxtech.io/dev1/'},



  VouchersHttpService,
  AuthHttpTestService,

  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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

  public static forRoot(baseUrl: string, baseCDN: string): ModuleWithProviders {
    console.log('baseUrl', baseUrl);
    console.log('baseCDN', baseCDN);
    return {
      ngModule: HttpServicesModule,
      providers: [
        {provide: BASE_URL_WS, useValue: baseUrl},
        {provide: BASE_CDN_URL_WS, useValue: baseCDN},
        ...providers,
      ]
    };
  }
}
