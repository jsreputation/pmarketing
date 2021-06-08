import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ConfigService } from '../../lib/config/config.service';
import { IBadgeService } from './badge.service';
import { V4BadgeService } from './v4-badge.service';

const badgeServiceStub: Partial<IBadgeService> = {
  getAchievedBadgeCount: () => of(),
  getAllBadges: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('V4BadgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule],
    providers: [
      { provide: IBadgeService, useValue: badgeServiceStub },
      { provide: ConfigService, useValue: configServiceStub }]
  }));

  it('should be created', () => {
    const service: V4BadgeService = TestBed.get(V4BadgeService);
    expect(service).toBeTruthy();
  });
});
