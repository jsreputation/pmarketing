import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { IVoucherService, Voucher, VouchersModule, ConfigService } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: (): Observable<Voucher[]> => of([])
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: ''
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletComponent],
      imports: [
        NoopAnimationsModule,
        MatTabsModule,
        VouchersModule,
        RouterTestingModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: ConfigService, useValue: configServiceStub }
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
