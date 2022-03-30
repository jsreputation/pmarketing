import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../config/config.module';
import { V4PlatformEnrolmentService } from './v4-platform-enrolment.service';
import { PlatformEnrolmentService } from './platform-enrolment.service';

describe('EnrolmentPlatformService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ConfigModule.forRoot({})],
      providers: [PlatformEnrolmentService],
    })
  );

  it('should be created', () => {
    const service: V4PlatformEnrolmentService = TestBed.get(
      V4PlatformEnrolmentService
    );
    expect(service).toBeTruthy();
  });

  it('should validatePlatformEnrolment', fakeAsync(
    inject(
      [V4PlatformEnrolmentService],
      (platformEnrolmentService: V4PlatformEnrolmentService) => {
        platformEnrolmentService
          .validatePlatformEnrolment()
          .subscribe((val) => expect(val.enrolled_in_perx).toBeTruthy());
        tick();
      }
    )
  ));
});
