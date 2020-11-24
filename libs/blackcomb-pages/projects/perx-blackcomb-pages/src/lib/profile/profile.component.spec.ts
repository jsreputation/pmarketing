import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ILoyalty,
  LoyaltyService,
  NotificationService,
  ProfileService,
  SettingsService
} from '@perxtech/core';
import { ProfileComponent } from './profile.component';
import {
  Observable,
  of
} from 'rxjs';
import {
  MatIconModule,
  MatListModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

const profileServiceStub: Partial<ProfileService> = {
  whoAmI: () => of()
};

const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalties: (): Observable<ILoyalty[]> => of([]),
  getLoyalty: (): Observable<ILoyalty> => of()
};

const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};

const notificationServiceStub: Partial<NotificationService> = {
  addSnack: () => { }
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        MatListModule,
        MatIconModule,
        RouterTestingModule,
        MatCheckboxModule
      ],
      providers: [
        DatePipe,
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
