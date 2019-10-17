import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';
import { IVoucherService, VouchersModule, ICampaignService, StampService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

const stampServiceStub = {
  getCurrentCard: () => of([])
};

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const vouchersServiceStub = {
    getAll: () => of([])
  };

  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletComponent],
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
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
