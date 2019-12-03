import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { gameServiceFactory } from './game.module';
import { V4GameService } from './v4-game.service';
import { WhistlerGameService } from './whist-game.service';

describe('GameModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: IVoucherService, useValue: {} }
      ]
    });
  });

  it('gameServiceFactory', inject([HttpClient, IVoucherService],
    (http: HttpClient, voucherService: IVoucherService) => {
      expect(gameServiceFactory(http, { isWhistler: false }, voucherService) instanceof V4GameService).toBeTruthy();
      expect(gameServiceFactory(http, { isWhistler: true }, voucherService) instanceof WhistlerGameService).toBeTruthy();
    }));
});
