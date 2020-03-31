import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { gameServiceFactory } from './game.service.module';
import { V4GameService } from './v4-game.service';
import { WhistlerGameService } from './whist-game.service';
import { ConfigService } from '../../public-api';
import { of } from 'rxjs';

describe('GameModule', () => {
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
    (http: HttpClient, voucherService: IVoucherService, configService: ConfigService) => {
      expect(gameServiceFactory(http, { isWhistler: false }, configService, voucherService) instanceof V4GameService).toBeTruthy();
      expect(gameServiceFactory(http, { isWhistler: true }, configService, voucherService) instanceof WhistlerGameService).toBeTruthy();
    }));
});
