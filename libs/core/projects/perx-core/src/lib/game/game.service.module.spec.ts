import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { gameServiceFactory } from './game.service.module';
import { V4GameService } from './v4-game.service';
import { WhistlerGameService } from './whist-game.service';
import { ConfigService } from '../config/config.service';
import { ICampaignService } from '../campaign/icampaign.service';
import { of } from 'rxjs';

describe('GameServiceModule', () => {
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: IVoucherService, useValue: {} },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    });
  });

  it('gameServiceFactory', inject([HttpClient, IVoucherService, ConfigService],
    (http: HttpClient, voucherService: IVoucherService, configService: ConfigService, campaignService: ICampaignService) => {
      expect(gameServiceFactory(http, { isWhistler: false }, configService, voucherService, campaignService)
        instanceof V4GameService).toBeTruthy();
      expect(gameServiceFactory(http, { isWhistler: true }, configService, voucherService, campaignService)
        instanceof WhistlerGameService).toBeTruthy();
    }));
});
