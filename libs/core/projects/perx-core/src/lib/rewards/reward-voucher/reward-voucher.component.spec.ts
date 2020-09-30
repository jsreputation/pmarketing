import { RewardVoucherComponent } from './reward-voucher.component';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { IReward } from '../models/reward.model';
import { of } from 'rxjs';
import { UtilsModule } from '../../utils/utils.module';
import { MatIconModule } from '@angular/material';
import { TokenStorage } from '../../utils/storage/token-storage.service';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { ProgressBarModule } from '@perxtech/core';
import { ProgressRequirePipe } from '../rewards-large-list/reward-requirement.pipe';

describe('RewardVoucherComponent', () => {
  let component: RewardVoucherComponent;
  let fixture: ComponentFixture<RewardVoucherComponent>;

  const mockReward: IReward = {
    id: 1,
    name: 'Get a Free Coke',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    subtitle: 'string',
    validFrom: new Date('2018-12-16T03:24:00'),
    validTo: new Date('2019-11-17T03:24:00'),
    sellingFrom: new Date('2018-12-16T03:24:00'),
    rewardThumbnail: 'https://picsum.photos/300/200?random=1',
    rewardBanner: 'https://picsum.photos/300/200?random=2',
    merchantImg: 'https://picsum.photos/300/200?random=3',
    merchantName: 'Pizza Hut',
    termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    merchantId: 2
  };

  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RewardVoucherComponent,
        ProgressRequirePipe
      ],
      imports: [
        UtilsModule,
        MatIconModule,
        MatCardModule,
        MatRippleModule,
        MatListModule,
        ProgressBarModule
      ],
      providers: [
        { provide: TokenStorage, useValue: tokenStorageStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVoucherComponent);
    component = fixture.componentInstance;
    component.rewardInitial$ = of(mockReward);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reward name should be displayed', fakeAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      tick();
      expect(fixture.nativeElement.querySelector('.reward-name').textContent.trim()).toEqual(mockReward.name);
      expect(fixture.nativeElement.querySelector('.merchant-name').textContent.trim()).toEqual(mockReward.merchantName);
      expect(fixture.nativeElement.querySelector('.reward-image').src).toEqual(mockReward.rewardBanner);
      expect(fixture.nativeElement.querySelector('.merchant-image').src).toEqual(mockReward.merchantImg);
    }
  ));
});
