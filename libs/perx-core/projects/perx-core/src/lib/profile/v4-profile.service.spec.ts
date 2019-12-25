import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { V4ProfileService } from './v4-profile.service';
import { ProfileModule } from './profile.module';

import { ConfigModule } from '../config/config.module';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ProfileModule,
      ConfigModule.forRoot({})
    ]
  }));

  it('should be created', () => {
    const service: V4ProfileService = TestBed.get(V4ProfileService);
    expect(service).toBeTruthy();
  });

  it('should call whoAmI', fakeAsync(inject([V4ProfileService, HttpClient],
    (profileService: V4ProfileService, http: HttpClient) => {
      spyOn(http, 'get').and.returnValue(of({ data: { id: 1 } }));
      profileService.whoAmI().subscribe((val) => { expect(val.id).toBe(1) });
      tick();
    })));

  it('setCustomProperties', fakeAsync(inject([V4ProfileService, HttpClient],
    (profileService: V4ProfileService, http: HttpClient) => {
      spyOn(profileService, 'whoAmI').and.returnValue(of({}));
      spyOn(http, 'patch').and.returnValue(of({ id: 1 }));
      profileService.setCustomProperties({ data: 'name' }).subscribe((val) => { expect(val).toBeTruthy() });
      tick();
    })));

  it('should getCustomProperties', fakeAsync(inject([V4ProfileService], (profileService: V4ProfileService) => {
    spyOn(profileService, 'whoAmI').and.returnValue(of({}));
    profileService.getCustomProperties().subscribe((val) => { expect(val).toBeTruthy() });
    tick();
  })));

  it('should updateUserInfo', fakeAsync(inject([V4ProfileService, HttpClient],
    (profileService: V4ProfileService, http: HttpClient) => {
      spyOn(profileService, 'whoAmI').and.returnValue(of({}));
      spyOn(http, 'patch').and.returnValue(of({ id: 1 }));
      profileService.updateUserInfo({}).subscribe((val) => { expect(val).toBeTruthy() });
      tick();
    })));
  it('should setCardNumber', fakeAsync(inject([V4ProfileService, HttpClient],
    (profileService: V4ProfileService, http: HttpClient) => {
      spyOn(profileService, 'whoAmI').and.returnValue(of({}));
      spyOn(http, 'patch').and.returnValue(of({ id: 1 }));
      profileService.setCardNumber({ cardNumber: 1, loyaltyProgramId: 2 }).subscribe((val) => { expect(val).toBeTruthy() });
      tick();
    })));
});
