import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatToolbarModule, MatTabsModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import { LoyaltyService, IProfile, ProfileService, FeedReaderService, RewardsModule } from '@perx/core';
import { of } from 'rxjs';
import { loyalty } from 'src/app/loyalty.mock';
import { Type } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const loyaltyServiceStub = {
    getLoyalty: () => of()
  };
  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: ''
  };

  const profileServiceStub = {
    whoAmI: () => of()
  };

  const newsFeedServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NoRenewaleInNamePipe],
      imports: [
        MatToolbarModule,
        MatTabsModule,
        RouterTestingModule,
        RewardsModule
      ],
      providers: [
        NoRenewaleInNamePipe,
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: FeedReaderService, useValue: newsFeedServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should get loyalty from loyaltyService.getLoyalty ', fakeAsync(() => {
      const loyaltyService: LoyaltyService = fixture.debugElement.injector.get<LoyaltyService>(LoyaltyService as Type<LoyaltyService>);
      const loyaltyServiceSpy = spyOn(loyaltyService, 'getLoyalty').and.returnValue(
        of(loyalty)
      );
      tick();
      component.ngOnInit();
      expect(loyaltyServiceSpy).toHaveBeenCalled();
      expect(component.loyalty).toBe(loyalty);
    }));

    it('should get profile from profileService.whoAmI ', fakeAsync(() => {
      const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
      const profileServiceSpy = spyOn(profileService, 'whoAmI').and.returnValue(
        of(mockProfile)
      );
      tick();
      component.ngOnInit();
      expect(profileServiceSpy).toHaveBeenCalled();
      expect(component.profile).toBe(mockProfile);
    }));
  });

  describe('getBadge', () => {
    it('should return assets/green-badge.png when null parameter has been passed', () => {
      const badge = component.getBadge(null);
      expect(badge).toBe('assets/green-icon.svg');
    });

    it('should return assets/green-badge.png when green parameter has been passed', () => {
      const badge = component.getBadge('green');
      expect(badge).toBe('assets/green-icon.svg');
    });

    it('should return assets/gold-badge.png when gold parameter has been passed', () => {
      const badge = component.getBadge('gold');
      expect(badge).toBe('assets/gold-icon.svg');
    });

    it('should return assets/platinum-badge.png when platinum parameter has been passed', () => {
      const badge = component.getBadge('platinum');
      expect(badge).toBe('assets/plat-icon.svg');
    });
  });
});
