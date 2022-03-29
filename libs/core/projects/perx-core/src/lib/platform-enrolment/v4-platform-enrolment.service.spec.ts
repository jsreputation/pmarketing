import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { V4PlatformEnrolmentService } from './v4-platform-enrolment.service';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PlatformEnrolmentService } from './platform-enrolment.service';

describe('EnrolmentPlatformService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ],
    providers: [
      PlatformEnrolmentService
    ]
  }));

  it('should be created', () => {
    const service: V4PlatformEnrolmentService = TestBed.get(V4PlatformEnrolmentService);
    expect(service).toBeTruthy();
  });

  it('should call validatePlatformEnrolment', fakeAsync(inject([V4PlatformEnrolmentService, HttpClient],
    (platformEnrolmentService: V4PlatformEnrolmentService, http: HttpClient) => {
      jest.spyOn(http, 'get').mockReturnValue(of({ data: { id: 1 } }));
      platformEnrolmentService.validatePlatformEnrolment().subscribe((val) => expect(val.enrolled_in_perx).toBe(true));
      tick();
    })));
});
