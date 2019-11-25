import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletComponent } from './wallet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IVoucherService, VouchersModule, ICampaignService, StampService, NotificationService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of([])
  };

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  const stampServiceStub: Partial<StampService> = {
    getCurrentCard: () => of()
  };

  const notificationServiceStub: Partial<NotificationService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        DatePipe,
        // { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: StampService, useValue: stampServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
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
