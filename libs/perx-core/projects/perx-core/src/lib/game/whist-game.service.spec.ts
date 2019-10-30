import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WhistlerGameService } from './whist-game.service';
import { TestBed } from '@angular/core/testing';
import { ConfigModule } from '../config/config.module';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { IJsonApiItem } from 'perx-core/lib/jsonapi.payload';
import { WAttbsObjGame, WGameType } from '@perx/whistler';
import { IJsonApiItemPayload } from '../jsonapi.payload';
import { Type } from '@angular/core';
import { IGame, GameType } from './game.model';

describe('WhistlerGameService', () => {
  let httpTestingController: HttpTestingController;
  let service: WhistlerGameService;
  const vouchersServiceMock = jasmine.createSpyObj('IVoucherService', ['']);

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };

  const mockTree: IJsonApiItem<WAttbsObjGame> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.shakeTheTree,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

  const mockTap: IJsonApiItem<WAttbsObjGame> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.pinata,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

  const mockScratch: IJsonApiItem<WAttbsObjGame> = {
    id: '2',
    type: '',
    links: {
      self: ''
    },
    attributes: {
      urn: '',
      created_at: '',
      updated_at: '',
      game_type: WGameType.scratch,
      title: '',
      description: '',
      image_url: '',
      properties: {},
      display_properties: {
        title: '',
        button: '',
        sub_title: ''
      }
    }
  };

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

  it('should get a tree from its id', (done: DoneFn) => {
    service.get(42)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.shakeTheTree);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<WAttbsObjGame> = {
      data: mockTree
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get a pinata from its id', (done: DoneFn) => {
    service.get(42)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.pinata);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<WAttbsObjGame> = {
      data: mockTap
    };
    req.flush(res);

    httpTestingController.verify();
  });

  it('should get a scratch card from its id', (done: DoneFn) => {
    service.get(42)
      .subscribe(
        (g: IGame) => {
          expect(`${g.id}`).toEqual(mockTree.id);
          expect(g.type).toEqual(GameType.scratch);
          done();
        },
        fail
      );

    const req = httpTestingController.expectOne('https://blabla/game/engagements/42');
    expect(req.request.method).toEqual('GET');
    const res: IJsonApiItemPayload<WAttbsObjGame> = {
      data: mockScratch
    };
    req.flush(res);

    httpTestingController.verify();
  });
});
