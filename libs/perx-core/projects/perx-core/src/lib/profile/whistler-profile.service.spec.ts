import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileModule } from './profile.module';

import { ConfigModule } from '../config/config.module';
import { TokenStorage } from '../utils/storage/token-storage.service';
import { WhistlerProfileService } from './whistler-profile.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IWProfileAttributes, IJsonApiItem } from '@perx/whistler';
const tokenStorageStrud: Partial<TokenStorage> = {
  getAppInfoProperty: () => 'test'
};
describe('WhistlerProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      { provide: TokenStorage, useValue: tokenStorageStrud }
    ]
  }));

  it('should be created', () => {
    const service: WhistlerProfileService = TestBed.get(WhistlerProfileService);
    expect(service).toBeTruthy();
  });

  it('should call whoAmI', fakeAsync(inject([WhistlerProfileService, HttpClient, TokenStorage],
    (profileService: WhistlerProfileService, http: HttpClient, storage: TokenStorage) => {
      const spy = jest.spyOn(http, 'get');
      spy.mockReturnValue(of({
        data: [{
          id: '1',
          attributes: {}
        } as IJsonApiItem<IWProfileAttributes>]
      }));
      profileService.whoAmI().subscribe(() => { });
      tick();
      spy.mockReturnValue(of({ data: [] }));
      jest.spyOn(storage, 'getAppInfoProperty').mockReturnValue('');
      profileService.whoAmI().subscribe(() => { }, (er) => expect(er.message).toEqual('There is no user with pi \'\''));
      tick();
    })));
});
