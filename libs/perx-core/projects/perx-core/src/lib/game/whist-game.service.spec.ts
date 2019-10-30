import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerGameService } from './whist-game.service';
import { TestBed } from '@angular/core/testing';
import { ConfigModule } from '../config/config.module';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { IJsonApiItem } from 'perx-core/lib/jsonapi.payload';
import { WAttbsObjGame } from '@perx/whistler';

describe('WhistlerGameService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerGameService;
  const vouchersServiceMock = jasmine.createSpyObj('IVoucherService', ['']);

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const mockGame: IJsonApiItem<WAttbsObjGame> = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfigModule.forRoot({ ...environment })],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceMock }
      ]
    });
    // httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    service = TestBed.get(WhistlerGameService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should get a game from its id', (done: DoneFn) => {
    service.get(1)
      .subscribe(
        (g) => {
          expect(g.id).toEqual(mockGame.id);
        },
        fail
      );


  });
});
