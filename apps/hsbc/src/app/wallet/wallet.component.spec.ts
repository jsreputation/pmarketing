import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { NavigateToolbarComponent } from '../navigate-toolbar/navigate-toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

import { VouchersModule, IVoucherService, ICampaignService, ConfigService } from '@perx/core';
import { of } from 'rxjs';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  const vouchersServiceStub = {
    getAll: () => of([])
  };

  const configServiceStub = {
    readAppConfig: () => of()
  };

  const campaignServiceStub = {
    getCampaigns: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WalletComponent,
        NavigateToolbarComponent,
      ],
      imports: [
        RouterTestingModule,
        VouchersModule,
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub }
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
