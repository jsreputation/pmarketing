import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { IVoucherService, VouchersModule, ICampaignService, LoyaltyModule, ProfileModule, ConfigModule } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { environment } from '../../environments/environment';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const vouchersServiceStub = {
    getAll: () => of()
  };

  const campaignServiceStub = {
    getCampaigns: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        HttpClientTestingModule,
        LoyaltyModule,
        ProfileModule,
        ConfigModule.forRoot({...environment}),
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
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
});
