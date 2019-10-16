import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { IVoucherService, VouchersModule, ICampaignService, StampService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const vouchersServiceStub = {
    getAll: () => of([])
  };

  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  const stampServiceStub = {
    getCurrentCard: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub }
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
