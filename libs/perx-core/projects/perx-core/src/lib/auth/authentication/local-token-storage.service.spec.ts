import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalTokenStorage } from './local-token-storage.service';
import { ProfileModule } from '../../profile/profile.module';
import { ConfigModule } from '../../config/config.module';
import { Config } from '../../config/config';

interface IAppInfo {
  appAccessToken?: string;
  userAccessToken?: string;
  [others: string]: any;
}

const appInfo: IAppInfo = {
  // appAccessToken: undefined,
  userAccessToken: 'test'
};
const localTokenStorageFactory = function (config?: Config) {
  return new LocalTokenStorage(config || null);
}
describe('LocalTokenStorageService', () => {
  describe('LocalStorageService with config', () => {
    let service: LocalTokenStorage;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          ProfileModule,
          ConfigModule.forRoot({})
        ],
        providers: [{
          provide: LocalTokenStorage,
          useFactory: localTokenStorageFactory,
          deps: [Config]
        }]
      });
    });

    it('should be created', () => {
      service = TestBed.get(LocalTokenStorage);
      expect(service).toBeTruthy();
    });

    it('should call getappinfo', inject([LocalTokenStorage], (localTokenStorage: LocalTokenStorage) => {
      localStorage.setItem('appInfo', JSON.stringify(appInfo));
      localTokenStorage.getAppInfo();
      expect(localTokenStorage.appInfo.userAccessToken).toEqual('test');
      localStorage.removeItem('appInfo');
      localTokenStorage.getAppInfo();
      expect(localTokenStorage.appInfo.userAccessToken).toEqual('');
    }));

    it('should get appinfo key', inject([LocalTokenStorage], (localTokenStorage: LocalTokenStorage) => {
      localStorage.setItem('appInfo', JSON.stringify(appInfo));
      const value = localTokenStorage.getAppInfoProperty('userAccessToken');
      expect(value).toBe(appInfo.userAccessToken);
    }));

    it('should set appinfo', inject([LocalTokenStorage], (localTokenStorage: LocalTokenStorage) => {
      const prop = { value: 'test', key: 'test' };
      localTokenStorage.setAppInfoProperty(prop.value, prop.key);
      const propValue = localTokenStorage.getAppInfoProperty(prop.key);
      expect(propValue).toBe(prop.value);
    }));

    it('should clear', inject([LocalTokenStorage], (localTokenStorage: LocalTokenStorage) => {
      localTokenStorage.clearAppInfoProperty(['userAccessToken']);
      expect(localTokenStorage.getAppInfoProperty('userAccessToken')).toBe(undefined);
      localTokenStorage.clearAppInfoProperty(['userAccessToken']);
      localTokenStorage.clearAppInfoProperty([]);
      expect(localTokenStorage.appInfo).toEqual({});
    }));
  });
  describe('WhistlerAuthenticationService without config', () => {
    it('should create even config is null', () => {
      const service = new LocalTokenStorage(null);
      expect(service).toBeTruthy();
    });
  });

});
