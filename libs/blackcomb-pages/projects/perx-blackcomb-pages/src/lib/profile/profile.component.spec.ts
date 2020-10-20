import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ILoyalty,
  LoyaltyService,
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

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        MatListModule,
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        DatePipe,
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
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
