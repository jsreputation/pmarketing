import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VouchersHttpService } from './vouchers-https.service';
import { AuthHttpService } from './auth-http.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfigServices } from '../configs/api-config';
import { AudiencesHttpsService } from './audiences-https.service';
import { CampaignsHttpsService } from './campaigns-https.service';
import { CommsHttpsService } from './comms-https.service';
import { EngagementsHttpsService } from './engagements-https.service';
import { IamUserHttpService } from './iam-user-http.service';
import { InstantRewardsHttpService } from './instant-rewards-http.service';
import { LimitsHttpsService } from './limits-https.service';
import { LoyaltyHttpService } from './loyalty-http.service';
import { LoyaltyRulesHttpService } from './loyalty-rules-http.service';
import { MerchantHttpService } from './merchant-http.service';
import { NotificationHttpService } from './notification-http.service';
import { OutcomesHttpsService } from './outcomes-https.service';
import { PinataHttpService } from './pinata-http.service';
import { RewardHttpService } from './reward-http.service';
import { ScratchHttpService } from './scratch-http.service';
import { SettingsHttpService } from './settings-http.service';
import { ShakeHttpService } from './shake-http.service';
import { SpinHttpService } from './spin-http.service';
import { StampHttpService } from './stamp-http.service';
import { SurveyHttpService } from './survey-http.service';
import { TenantHttpService } from './tenant-http.service';
import { UploadFileHttpService } from './upload-file-http.service';
import { LoyaltyCardHttpService } from './loyalty-cards-http.service';

export const BASE_URL_WS = new InjectionToken<string>('BaseUrl');
export const BASE_CDN_URL_WS = new InjectionToken<string>('BaseCDNUrl');

const providers: any[] = [
  VouchersHttpService,
  AuthHttpService,
  ApiConfigServices,
  AudiencesHttpsService,
  CampaignsHttpsService,
  CommsHttpsService,
  EngagementsHttpsService,
  IamUserHttpService,
  InstantRewardsHttpService,
  LimitsHttpsService,
  LoyaltyHttpService,
  LoyaltyRulesHttpService,
  MerchantHttpService,
  NotificationHttpService,
  OutcomesHttpsService,
  PinataHttpService,
  RewardHttpService,
  ScratchHttpService,
  SettingsHttpService,
  ShakeHttpService,
  SpinHttpService,
  StampHttpService,
  SurveyHttpService,
  TenantHttpService,
  UploadFileHttpService,
  LoyaltyCardHttpService,
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

  public static forRoot(baseUrl: string, baseCDN: string): ModuleWithProviders {
    return {
      ngModule: HttpServicesModule,
      providers: [
        ...providers,
        {provide: BASE_URL_WS, useValue: baseUrl},
        {provide: BASE_CDN_URL_WS, useValue: baseCDN},
      ]
    };
  }
}
